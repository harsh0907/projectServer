const mongoose = require('mongoose')

module.exports = mongoose.model('orgamecha',{
    name:{
        require:true,
        type: String
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    mobileno:{
        require:true,
        type: Number,
        unique:true,
        validate(value) {
              if(!(value>=1000000000 && value<=9999999999))
                throw new Error("mobile no should be in 10 digits")
               
        }

    },
    Address:{
        type:String
    },
    ownerid:{
        require:true,
        type:mongoose.ObjectId 
    },
    rating:{
        require:true,
        type:Number,
        default:4
    },
    activation:{
        type:Boolean,
        require:true,
        default:true
    },
    bike:{
        type:Number,
        require:true,
        default:0
    },
    car:{
        type:Number,
        require:true,
        default:0
    },
    bus:{
        type:Number,
        require:true,
        default:0
    },
    truck:{
        type:Number,
        require:true,
        default:0
    },
    tacter:{
        type:Number,
        require:true,
        default:0
    },
    autoer:{
        type:Number,
        require:true,
        default:0
    },
    mechano:{
        type:Number,
        require:true,
        default:1
    },
    token:{
        type:String,
        require:true,
        default:"login"
    }
})