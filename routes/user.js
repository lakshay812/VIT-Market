const express=require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const Message = require('../models/Message');
const { isLogin, validateMessage } = require('../middlleware');

const router=express.Router();

router.post('/feedback',isLogin,validateMessage,async(req,res)=>{
    let{name,phone,email,message}=req.body;
    req.flash('success','Feedback Submitted Success ')
    await Message.create({name,phone,email,message});
    res.redirect('/');
})
module.exports=router;