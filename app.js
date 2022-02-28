const express = require('express');
const cors = require('cors');
const DataLoadRouter = require('./routes/DataLoadRouter');


const app = new express();

app.use(cors());
app.use(express.json());

app.use("/api/uploadShape",DataLoadRouter);

app.get("/api/ping",(req,res)=>{
    res.status(200).json({"state":"live"});
})
module.exports = app;