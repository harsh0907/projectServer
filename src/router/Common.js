const express = require('express')

const mecha = require('../db/models/mecha')
const orgamecha = require('../db/models/orgamecha')
const cust = require('../db/models/cust')
const history = require('../db/models/history')


const app = express.Router()


app.get('/',(req,res) => {
    res.send("working")
})


app.post('/history',async(req,res)=>{
    try{const {type,_id} = req.body
    const History =await history.find({[type]:_id})
    res.send(History)}catch(e){res.status(500).send("invalid request")}
})




app.post('/login',async(req,res)=>{

    try{
     const {email,password,type} = req.body
    const Mecha = await mecha.find({email,password})
    const Cust = await cust.find({email,password})
    const Orgamecha = await orgamecha.find({email,password})
    var id1 = []
    
    if(Mecha.length === 0 && Cust.length===0 && Orgamecha.length===0)
       throw new Error()


    if(Mecha.length!==0 && type === 'mecha'){
        if(Mecha[0].token === 'login')
          throw new Error()
        const _id = await mecha.findByIdAndUpdate(Mecha[0]._id,{activation:true,token:"login"})  
        id1.push(_id)
    }

    if(Cust.length!==0 && type === 'cust'){
        if(Cust[0].token === 'login')
          throw new Error()
        const _id = await cust.findByIdAndUpdate(Cust[0]._id,{activation:true,token:"login"})  
        id1.push(_id)
    }

    if(Orgamecha.length!==0 && type === 'orgamecha'){
        if(Orgamecha[0].token === 'login')
          throw new Error()
        const _id = await orgamecha.findByIdAndUpdate(Orgamecha[0]._id,{activation:true,token:"login"})
        id1.push(_id)  
    }
     
     res.status(200).send(id1)

   }catch(e){ 
    res.status(500).send("invalid login")}
    

    
})




app.post('/logout',async(req,res)=>{
    try{await mecha.findByIdAndUpdate(req.body._id,{activation:false,token:"logout"})
    await cust.findByIdAndUpdate(req.body._id,{activation:false,token:"logout"})
    await orgamecha.findByIdAndUpdate(req.body._id,{activation:false,token:"logout"})
    res.send("logout")}catch(e){res.status(500).send("invalid request")}
})


module.exports = app