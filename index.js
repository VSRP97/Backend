const express= require('express');
const data=require('./data/data')
const item=require('./player/character/item')

let app=express()

app.use(express.json())

// app.get('/items',item);
// app.get('/',(req,res)=>{
//     res.send('Hola')

// });
app.use('/items',item);

app.use('/items/:name/:id/:level/:des/:image/:sell',item)
app.listen(8000);