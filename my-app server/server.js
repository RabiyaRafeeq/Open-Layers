const app = require('./app');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/featuresData',()=>{
    console.log("DB connetced")
})

app.listen(8001,()=>{
    console.log('server started on localhost:8001')
})