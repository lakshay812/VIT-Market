const express=require('express');

const app=express();
const path=require('path');
const session = require('express-session')
const mongoose = require('mongoose');
const flash=require('connect-flash');
const authRoute=require('./routes/auth/register')
const productRoute = require('./routes/product');
const userRoute = require('./routes/user')
const carRoute = require('./routes/car')
const carApi=require('./routes/api/car-api')
const  methodOverride = require('method-override');
const LocalStrategy=require('passport-local');
const Product = require('./models/Product');
const User=require('./models/User')
const passport = require('passport');
const Message = require('./models/Message');
const { isLogin, isSeller,validateProduct, validateMessage, validateUser, validateCar,isAuthor } = require('./middlleware');
app.use(methodOverride('_method'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    
}))
app.use(flash());
const port=5050;
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    // console.log(res.locals.error);
    next();
})
mongoose.connect('mongodb://127.0.0.1:27017/rent');
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


app.get('/',async(req,res)=>{
    
    let products=await Product.find();
    let FoodItems=[];
    let Books=[];
    let Cycles=[];
    let Others=[];

    for(let item of products){
        if(item.type=='FoodItems'){
            FoodItems.push(item.img);
        }
        else if(item.type=='Books'){
            Books.push(item.img);
        }
        else if(item.type=='Cycles'){
            Cycles.push(item.img);
        }
        else if(item.type=='Others'){
            Others.push(item.img);
        }
    }
    
    console.log(FoodItems)
    // res.send('heheh')
    res.render('main/index',{FoodItems,Books,Cycles,Others});
})

app.get('/product/new',isLogin,isSeller,(req,res)=>{
    res.render('main/form')
})

app.use(carApi)
app.use(productRoute);
app.use(authRoute);
app.use(userRoute);
app.use(carRoute);
app.listen(port,()=>{
    console.log("connected")
})
