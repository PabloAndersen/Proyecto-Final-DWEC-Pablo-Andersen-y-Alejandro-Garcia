const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.render("index",{
        titulo:"titulo dinamico"
    })
})

router.get('/inicioSesion', (req,res)=>{
    res.render("inicioSesion",{
    })
})


module.exports=router;