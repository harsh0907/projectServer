const express = require('express')
const moment  = require('moment')

const mecha = require('../db/models/mecha')
const orgamecha = require('../db/models/orgamecha')
const cust = require('../db/models/cust')
const history = require('../db/models/history')
const admin = require('../db/models/admin')
const txn = require('../db/models/txn')
const {price} = require('../initialization')


const app = express.Router()


app.post('/admin/login',async(req,res)=>{
	const {email, password} = req.body
    try{var op = [1]
    var sta = 200
    const Admin = await admin.find({email,password})
    if(Admin.length ===0 )
      {op=[0]}  
     res.status(sta).send(op)}catch(e){res.status(500).send("error")}   
})



app.post('/admin/newuser',async(req,res) =>{
    try{const Admin = await new admin(req.body)
    await Admin.save()
    res.send("user create")}catch(e){res.status(500).send("error")}
})



app.post('/admin/payment',async(req,res)=>{
    try{const {historyid,amount,txnid,time} = req.body
    await history.findByIdAndUpdate(historyid,{paycomplete:true})
    
    const Txn = await new txn({amount,txnid,time})
    await Txn.save()
    res.send("ok")}catch(e){res.status(500).send("invalid request")}
})




app.post('/database/mecha',async(req,res) =>{
     try{await mecha.remove()
     res.send("Ok!")}catch(e){res.status(500).send("invalid request")}
})




app.post('/database/cust',async(req,res)=>{
    try{await cust.remove()
    res.send("Ok!")}catch(e){res.status(500).send("invalid request")}
})




app.post('/database/orgamecha',async(req,res)=>{
    try{await orgamecha.remove()
    res.send("Ok!")}catch(e){res.status(500).send("invalid request")}
})





app.post('/database/txn',async(req,res)=>{
    try{await txn.remove()
    res.send("Ok!")}catch(e){res.status(500).send("invalid request")}
})




app.post('/database/history',async(req,res)=>{
    try{await history.remove()
    res.send("Ok!")}catch(e){res.status(500).send("invalid request")}
})






app.post('/changeprice',(req,res)=>{
    try{price[0] = req.body.price
    res.send([1])}catch(e){res.status(500).send("invalid request")}
})


app.post('/showprice',(req,res)=>{
    try{res.send(price)}catch(e){res.status(500).send("invalid request")}
})



app.post('/logoutall',async(req,res)=>{
    try{const {email} = req.body
    const Mecha = await mecha.find({email})
    const Cust = await cust.find({email})
    const Orgamecha = await orgamecha.find({email})
    
    if(Mecha.length === 1)
      await mecha.findByIdAndUpdate(Mecha[0]._id,{activation:false,token:"logout"})
    if(Cust.length === 1 )
      await cust.findByIdAndUpdate(Cust[0]._id,{activation:false,token:"logout"})
    if(Orgamecha.length === 1)
      await orgamecha.findByIdAndUpdate(Orgamecha[0]._id,{activation:false,token:"logout"})

    res.send([1])}catch(e){res.status(500).send("invalid request")}
})





app.post('/mecha',async(req,res)=>{
    try{const Mechas = await mecha.find({})
    res.send(Mechas)}catch(e){res.status(500).send("invalid request")}
})




app.post('/customer',async(req,res)=>{
   try{ const Cust = await cust.find({})
    res.send(Cust)}catch(e){res.status(500).send("invalid request")}
})




app.post('/mecha/all',async(req,res)=>{
    try{const {_id} = req.body
    const Mecha = await mecha.findById(_id)
    if(Mecha.Organization){
       const Orgas = await orgamecha.find({ownerid:_id})
       res.send(Orgas)
    }else{res.send("NO!")}}catch(e){res.status(500).send("invalid request")}
})



app.post('/orgamecha',async(req,res)=>{
    try{const Orgamecha = await orgamecha.find({})
    res.send(Orgamecha)}catch(e){res.status(500).send("invalid request")}
})





app.post('/txn',async(req,res)=>{
    try{const {mechaid} = req.body
    const Txns = await txn.find({mechaid})
    res.send(Txns)}catch(e){res.status(500).send("invalid request")}
})







app.post('/admin/history',async(req,res)=>{
    try{const {minday,minmon,minyear,maxday,maxmon,maxyear} = req.body
    const low = moment({ 
        year :minyear, month :(minmon-1), day :minday
    }).valueOf()
    const high = moment({ 
        year :maxyear, month :(maxmon-1), day :maxday, 
        hour :23, minute :59
    }).valueOf()
    const History =await history.find({paycomplete:false})
    res.send(History)}catch(e){res.status(500).send("invalid request")}
})


module.exports = app