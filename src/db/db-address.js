const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:admin@cluster0-zow0t.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})