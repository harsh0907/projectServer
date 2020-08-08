const express = require('express')
const request = require('request')
const moment  = require('moment')

const mecha = require('../db/models/mecha')
const orgamecha = require('../db/models/orgamecha')
const cust = require('../db/models/cust')
const history = require('../db/models/history')
const txn = require('../db/models/txn')
const {price, map} = require('../initialization')


const app = express.Router()







app.post('/cust/newuser', async(req,res)=>{
    try{
        const Cust = await new cust(req.body)
      await Cust.save()
        res.status(200).send(Cust)
    }catch(e){
        res.status(500).send(e)
    }
})





app.post("/cust/deluser",async(req,res)=>{
    try{
        await cust.deleteOne(req.body)
        res.status(200).send("OK!")
    }catch(e){ res.status(500).send(e)}
})







app.post("/cust/updateuser/:id",async(req,res)=>{
    try{
        await cust.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const Cust = await cust.findById(req.params.id)
        res.send(Cust)
    }catch(e){
        res.status(500).send(e)
    }
})



app.post('/cust/mechalist',async(req,res)=>{
    const {toe=0,type="car",latitude=0,longitude=0} = req.body
    try{
        
        console.log(req.body)

         const list = await mecha.find({toe :{$gte:toe},mechano:{$gte:1}, activation:true,[type]: { $gte: 1 }})
        
          if(list.length ===0 || req.body.latitude === null || req.body.longitude === null)
            res.status(200).send([])
          else
          {const list2 = [
            {
              "point": {"latitude": latitude,"longitude": longitude}
            }
          ]
          
          const list3 =[]

          list.forEach((lis) =>{
              list3.push({
                "point": {"latitude": lis.latitude,"longitude": lis.longitude}
              })
          })


         const list1 = {
             "origins": list2,
             "destinations": list3
         }
         
         

         const url = 'https://api.tomtom.com/routing/1/matrix/sync/json?key=jU4h6prZhmfPawSj5A5qdfEQn1VH3kiQ'
        
        request({
            headers: {
              'Content-Type': 'application/json'
            },
            uri: url,
            body: JSON.stringify(list1) ,
            method: 'POST'
          }, function (err, re, body) {
            var sta = 200
            var op = []
            console.log(0)
            console.log(body)
            console.log(1)
            const final = JSON.parse(body)
            console.log(final)
            if(final.matrix[0][0].statusCode !== 400 )     
            {
                console.log(2)
               op = list.map((res,index)=>{
                 res._doc.time = final.matrix[0][index].response.routeSummary.travelTimeInSeconds
                 res._doc.distance = final.matrix[0][index].response.routeSummary.lengthInMeters
                 return res})
                 sta = 200
            }else{
                sta = 500
             }
             console.log(3)
             res.status(sta).send(op)
          })}
          
          
        
    }catch(e){
        res.status(500).send(e)
    }
})



app.post('/cust/selectmecha',async(req,res)=>{
         try{const {mechaid,longitude,latitude,custid,type,distance,time,address,toe} = req.body
         const Mecha = mecha.findById(mechaid)
         const define ={
             "custid":custid,
             "mechaid":mechaid,
             "requesttime":moment().valueOf(),
             "typeofvehicle":type,
             "longitude":longitude,
             "latitude":latitude,
             "originalamount": parseInt(price[0]),
			 address,
			 toe,
         }
         await mecha.findByIdAndUpdate(mechaid,{activation:false})
		 const user = await cust.findById(custid)
         const History = await new history(define)
         await History.save()
         map.set(JSON.stringify(mechaid),[1,latitude,longitude,custid,type,History._id,distance,time,user.email,user.mobileno])
         console.log(map)
         res.send(History._id)}catch(e){
             res.status(500).send(e)}
})



app.post('/cust/done',async(req,res)=>{
    try{
        await mecha.findByIdAndUpdate(req.body._id,{mechano:1,activation:true})
        const orga = await orgamecha.findByIdAndUpdate(req.body._id,{mechano:1,activation:true})
        const ele = map.get(JSON.stringify(req.body._id))

        if(orga!==null){
            const base = await mecha.findById(orga.ownerid)
            const changebase = {
                mechano:base.mechano+1,
                car:base.car+orga.car,
                bike:base.bike+orga.bike,
                truck:base.truck+orga.truck,
                bus:base.bus+orga.bus,
                tacter:base.tacter+orga.tacter,
                autoer:base.autoer+orga.autoer
            }
            await mecha.findByIdAndUpdate(orga.ownerid,changebase,{ new: true, runValidators: true })
            
        }
        await history.findByIdAndUpdate(ele[5],{donetime:moment().valueOf()})
        map.set(JSON.stringify(req.body._id),[0])
        console.log(map)
        res.send("ok")
    }catch(e){res.status(500).send(e)}
})



app.post('/cust/feedback',async(req,res)=>{
    try{const Mecha =await mecha.findById(req.body._id)
    const orga =await orgamecha.findById(req.body._id)
    if(orga!==null){
        const base =await mecha.findById(orga.ownerid)
        await mecha.findByIdAndUpdate(orga.ownerid,{rating:((base.rating+req.body.rating)/base.mechano)})
        await orgamecha.findByIdAndUpdate(orga._id,{rating:((orga.rating+req.body.rating)/2)})
    }else{
        await mecha.findByIdAndUpdate( Mecha._id,{rating:((Mecha.rating+req.body.rating)/2)})
    }
    await history.findByIdAndUpdate(req.body.historyid,{feedback:req.body.rating})
    res.send('thanks')}catch(e){res.status(500).send("invalid request")}
})



app.post('/cust/checkpoint',async(req,res)=>{
    try{
        const {historyid} = req.body
        const History = await history.findById(historyid)
        if(History.destinationtime!==null)
           res.send([1])
        else 
           res.send([0])   
    }catch(e){res.status(500).send("Invalid request")}
})



app.post('/cust/payment',async(req,res)=>{
    try{const {id,amount} = req.body
    const Txn = await new txn({id,amount,time:moment().valueOf()})
    await Txn.save()
    res.send(Txn)}catch(e){res.status(500).send("Invalid request")}
})


app.post('/cust/paymentupdate',async(req,res)=>{
    try{const {_id,historyid = null,status,txnid = null,amount} = req.body
    if(status === 'SUCCESS'){
        await history.findByIdAndUpdate(historyid,{chargingfee:amount})
    }
	   await txn.findByIdAndUpdate(_id,{status,txnid,historyid});	
    res.send("Ok")}catch(e){res.status(500).send("Invalid request")}
})


app.post('/cust/relese',async(req,res) => {
    try{const {historyid} = req.body;
    var op = [0]
    const History = await history.findById(historyid);
    if(History.relese)
       op = [1]
    
    res.send(op)}catch(e){res.status(500).send("invalid request")}
})



app.post('/cust/cencel',async(req,res)=>{
    try{

        await mecha.findByIdAndUpdate(req.body._id,{mechano:1,activation:true})
        const orga = await orgamecha.findByIdAndUpdate(req.body._id,{mechano:1,activation:true})
        const ele = map.get(JSON.stringify(req.body._id))

        if(orga!==null){
            const base = await mecha.findById(orga.ownerid)
            const changebase = {
                mechano:base.mechano+1,
                car:base.car+orga.car,
                bike:base.bike+orga.bike,
                truck:base.truck+orga.truck,
                bus:base.bus+orga.bus,
                tacter:base.tacter+orga.tacter,
                autoer:base.autoer+orga.autoer
            }
            await mecha.findByIdAndUpdate(orga.ownerid,changebase,{ new: true, runValidators: true })
            
        }
        await history.findByIdAndUpdate(ele[5],{cencelbycustomer:true,cenceltime:moment().valueOf(),originalamount:0})
 
        map.set(JSON.stringify(req.body._id),[0])
    res.send("cencel")}catch(e){res.status(500).send("invalid request")}
})

module.exports = app