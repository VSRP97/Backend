const express= require('express');

let app=express()

app.use(express.json())
const missions = require('./mission/misiones')
app.use('/missions', missions)

app.get('/',async(req,res)=>{
    res.status(200).json({'message':'success'})
});

app.listen(8080);