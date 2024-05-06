const express=require('express');

const { isAuthor, isLogin, isSeller, validateCar, isAuthor2 } = require('../middlleware');
const Car = require('../models/Car');
const router=express.Router();

router.get('/car/new',isLogin,(req,res)=>{
    res.render('main/new');
})
router.post('/car',isSeller,validateCar,async (req,res)=>{
    let{name,price,date,email,seat,phone,upperCarriage,source,destination,carName,time}=req.body;
    await Car.create({name,price,date,email,seat,phone,source,destination,carName,time,author:req.user._id,upperCarriage:upperCarriage==='on'});
    res.redirect('/');
})
router.get('/car',isLogin,async(req,res)=>{
    let cars=await Car.find().populate('author');
    res.render('main/car',{cars});
})
router.get('/car/:id',isLogin,async(req,res)=>{
    let {id}=req.params;
    
    try{
        let car= await Car.findById(id).populate('author');
        res.render('main/info',{car});
    }
    catch(e){
        req.flash('error',e.message)
         res.redirect('/car');
    }
    
})
router.get('/car/:id/edit',isLogin,isSeller,isAuthor2,async (req,res)=>{
    let {id}=req.params;
    try{
        let car=await Car.findById(id);
        res.render('main/edit-car',{car})

    }
    catch(e){
        req.flash('error',e.message)
        res.redirect('/car')
    }
})
router.patch('/car/:id',validateCar,async (req,res)=>{
    let {id}=req.params;
    await Car.findByIdAndUpdate(id,req.body);
    res.render('/car');    
})
router.delete('/car/:id',isAuthor2,async (req,res)=>{
    let {id}=req.params;
    await Car.findByIdAndDelete(id);
    res.redirect('/car');
})
module.exports=router;