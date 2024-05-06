const { productSchema,messageSchema,carSchema,userSchema } = require("./Schema");
const Car = require("./models/Car");
const Product = require("./models/Product");

let isLogin=((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You need to Login First');
        return res.redirect('/login');
    }
    next();
})

let isSeller=((req,res,next)=>{
    if(req.user.type!=='seller'){
        req.flash('error','You need to be a Seller to add a Product');
        res.redirect('/')
    }
    next();
})
let isAuthor=(async (req,res,next)=>{
    let {id}=req.params;
    let product=await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('error','You Need to be Creater of the Product to delete/edit this')

        return res.redirect('/products/cycle');
    }
    next();
})
let isAuthor2=(async (req,res,next)=>{
    let {id}=req.params;
    console.log(id)
    let car=await Car.findById(id); 
    console.log(1);
    if(req.xhr && !car.author.equals(req.user._id)){
        return res.status(404).send('Sorry, we cannot find that!');
    }
    if(!car.author.equals(req.user._id)){
        req.flash('error','You Need to be Creater of the ride to delete/edit this ride')
        console.log(3)
        return res.redirect('/car')
    }
    next();
})
const Joi = require('joi');

// Joi schemas
productSchema

// Validation middleware function
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ error: errorMessage });
        }
        next();
    };
}

// Validation middleware for product
const validateProduct = validate(productSchema);

// Validation middleware for message
const validateMessage = validate(messageSchema);

// Validation middleware for user
const validateUser = validate(userSchema);

// Validation middleware for car
const validateCar = validate(carSchema);



module.exports={isAuthor,isLogin,isSeller, validateProduct, validateMessage, validateUser, validateCar,isAuthor2 };