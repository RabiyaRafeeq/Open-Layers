const app = require('./app');
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/featureData',()=>{
    console.log("DB connetced")
})

app.listen(8000,()=>{
    console.log('server started on localhost:8000')
})