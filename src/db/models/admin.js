const mongoose = require('mongoose')

module.exports = mongoose.model('admin',{
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
    }

})