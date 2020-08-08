const express = require('express')
require('./db/db-address')


const {intial} = require('./initialization')
const AdminRouter = require('./router/Admin')
const CommonRouter = require('./router/Common')
const CustomerRouter = require('./router/Customer')
const MechanicRouter = require('./router/Mechanic')
const { init } = require('./db/models/txn')



const app = express()
app.use(express.json())

app.use(AdminRouter)
app.use(CommonRouter)
app.use(CustomerRouter)
app.use(MechanicRouter)
intial()


app.listen(process.env.PORT ||3000,()=> console.log("running"))