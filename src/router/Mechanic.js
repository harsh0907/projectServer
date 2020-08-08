const express = require('express')
const moment  = require('moment')

const mecha = require('../db/models/mecha')
const orgamecha = require('../db/models/orgamecha')
const cust = require('../db/models/cust')
const history = require('../db/models/history')
const txn = require('../db/models/txn')
const {map} = require('../initialization')


const app = express.Router()


app.post("/mecha/newuser", async(req,res)=>{
    try{
      const Mecha = await new mecha(req.body)
      await Mecha.save()
      map.set(JSON.stringify(Mecha._id),[0])
     
        res.status(200).send([1])
    }catch(e){
        res.status(500).send(e)
    }
})






app.post("/mecha/deluser",async(req,res)=>{
    try{
        await mecha.deleteOne(req.body)
        map.delete(JSON.stringify(req.body._id))

       const alllist = await orgamecha.find({ownerid:req.body._id})
       alllist.forEach((res)=>{ map.delete(JSON.stringify(res._id))})
       await orgamecha.deleteMany({ownerid:req.body._id})
       
       res.status(200).send("OK!")
    }catch(e){ res.status(500).send(e)}
})





app.post('/mecha/checkpoint',async(req,res)=>{
    const med = []
    try
    {const use = map.get(JSON.stringify(req.body._id))
     med.push(use)   
    if(use[0] != 0)
    {const result = await cust.findById(use[3])
        const Mecha = await mecha.findById(req.body._id)
    if(Mecha.Organization){
        const mechalist = await orgamecha.find({ownerid :req.body._id,mechano:{$gte:1},[use[4]]: { $gte: 1 }})
        med.push(result.name,mechalist)
        }else{
        await mecha.findByIdAndUpdate(req.body._id,{mechano:0,activation:true})
        await history.findByIdAndUpdate(use[5],{arrivaltime:moment().valueOf()})
        med.push(result.name)
    }}
    res.send(med)
     
 }catch(e){
    res.send(e)}
 

})








app.post('/mecha/payment',async(req,res)=>{
    try{
        const {status,_id,txnid,mechaid} = req.body
		await txn.findByIdAndUpdate(_id,{status,txnid});	
        const update = await history.updateMany({mechaid},{$set:{ paycomplete: true } })
       res.send("Ok!")
    } catch(e){res.status(500).send("invalid request")} 
})





app.post('/mecha/reply',async(req,res)=>{
    try{const {_id,mechaid} = req.body
    const use = map.get(JSON.stringify(mechaid))
    map.set(JSON.stringify(_id),use)
    const orga = await orgamecha.findByIdAndUpdate(_id,{mechano:0})
    await mecha.findByIdAndUpdate(orga.ownerid,{activation:true})
    
    res.send("Ok!")}catch(e){res.status(500).send("invalid request")} 
})





app.post('/mecha/reach',async(req,res)=>{
    try{
        const use = map.get(JSON.stringify(req.body._id))
       await history.findByIdAndUpdate(use[5],{destinationtime:moment().valueOf()})
       res.status(200).send("ok!")
    }catch(e){res.status(500).send(e)}
})





app.post("/mecha/updateuser/:id",async(req,res)=>{
    const updates = Object.keys(req.body)
    const isValidOperation = updates.includes('rating')
    if (isValidOperation) {
        return res.status(500).send({ error: 'Invalid updates!' })
    }
    
    try {
        await mecha.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user = await mecha.findById(req.params.id)
        if (!user) {
            return res.status(500).send("Invalid User")
        }
        
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})




app.post('/mecha/arrival',async(req,res)=>{
    try{await history.findByIdAndUpdate(req.body._id,{arrivaltime:moment().valueOf()})
    res.send("ok you reach")}catch(e){res.status(500).send("invalid request")}
})





app.post('/mecha/checkpoint/cencel',async(req,res)=>{
    try{const History = await history.findById(req.body._id)
    res.send(History.cencelbycustomer)}catch(e){res.status(500).send("invalid request")}
})





app.post('/mecha/checkpoint/done',async(req,res)=>{
    try{const {_id} = req.body
    const His = await history.findById(_id)
    if(His.donetime !== null)
       res.send([1])
    else
       res.send([0])}catch(e){res.status(500).send("invalid request")}   
})





app.post('/mecha/payment',async(req,res)=>{
    try{const {merchantid,historyids,amount,txnid,time} = req.body
    historyids.forEach((id)=>{
    
     history.findByIdAndUpdate(id,{paycomplete:true})
    })
    const Txn = await new txn({merchantid,amount,txnid,time})
    await Txn.save()
    res.send("ok")}catch(e){res.status(500).send("invalid request")}
})





app.post('/mecha/relese',async(req,res) => {
    try{const {historyid} = req.body;
    await history.findByIdAndUpdate(historyid,{relese:true});
    res.send('relese')}catch(e){res.status(500).send("invalid request")}
})





module.exports = app