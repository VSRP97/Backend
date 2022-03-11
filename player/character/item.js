const express=require('express');
const { send } = require('process');
const router=express.Router();
const data=require('../../data/data');
let agregando=[]
router.use(express.json())


router.get('/',async(req,res)=>{
res.status(200).send(data);
console.log('funciona');
}
);

router.post('/',async(req,res)=>{
res.send(req.query.name)
    }    );

module.exports=router;