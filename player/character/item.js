const express=require('express');
const router=express.Router();
const data=require('../../data/data.js');

router.get('/',async(req,res)=>
res.send('Hola')
);