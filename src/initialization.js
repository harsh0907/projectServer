const mecha = require('./db/models/mecha')
const orgamecha = require('./db/models/orgamecha')
const { model } = require('./db/models/mecha')


// some important constant
const map = new Map()
const price = ['0']




// some ipmortant function
const intial = async() => {

    let list = await mecha.find({})
    list.forEach((res) => {map.set(JSON.stringify(res._id),[0])})

    list = await orgamecha.find({})
    list.forEach((res) => {map.set(JSON.stringify(res._id),[0])})
    console.log(map)
}


module.exports = {intial, price, map}