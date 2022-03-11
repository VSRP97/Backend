const express=require('express');
const router=express.Router();
const data=require('../../data/data');

router.get('/',async(req,res)=>{
res.status(200).send(data);
console.log('funciona');
}
);

module.exports=router;