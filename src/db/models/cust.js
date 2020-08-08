const mongoose = require('mongoose')

module.exports = mongoose.model('cust',{
    name:{
        require:true,
        type: String
    },
    email:{
        type:String,
        require:true,
        unique: true
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
    latitude:{
        require:true,
        type: Number
    },
    longitude:{
        require:true,
        type:Number
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    typeofvehicle:{
        require:true,
        type:String,
        default:"car"
    },
    activation:{
        require:true,
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        require:true,
        default:"login"
    }

})