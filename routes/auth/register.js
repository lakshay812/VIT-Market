const express=require('express');
const Product = require('../../models/Product');
const User=require('../../models/User');
const passport = require('passport');
const { validateProduct, validateUser } = require('../../middlleware');
const router=express.Router();

router.get('/register',async (req,res)=>{
    
    res.render('main/register');  

})
router.post('/register',async (req,res)=>{
    let {username,phone,email,type,password}=req.body;
    
    let user = new User({ username, email, phone, type });
    try{
     await User.register(user, password);
    }
    catch(e){
        req.flash('error',e.message)
        return res.redirect('/register');
    }
     res.redirect('/login');    
})
router.get('/login',async (req,res)=>{
    
    res.render('main/login');  

})
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    req.flash('success',`Welcome ${req.user.username}`)
    res.redirect('/');
});

  router.post('/logout', function(req, res, next) {
    
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success',`You have successfully Logged Out`)
      res.redirect('/login');
    });
  });
  module.exports=router;