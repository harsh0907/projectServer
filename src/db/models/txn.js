const mongoose = require('mongoose')

module.exports = mongoose.model('txn',{
    amount:{
        require:true,
        type: Number
    },
    txnid:{
        type:String,
        require:true,
        default:null,
    },
    time:{
        require:true,
        type: String
    },
    id:{
        require:true,
        type:mongoose.ObjectId ,
        default:null
    },
    status:{
        require:true,
        type:String,
        default:null,
    },
    historyid:{
        require:true,
        type:mongoose.ObjectId ,
        default:null
    }
})