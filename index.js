const express= require('express');

let app=express()

app.get('/',async(req,res)=>{
res.send('Funciona');
});

app.listen(8000);