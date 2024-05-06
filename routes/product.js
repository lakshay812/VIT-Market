const express = require('express');
const Product = require('../models/Product');
const flash = require('connect-flash');
const multer = require('multer'); // Import multer
const { isLogin, isSeller, validateProduct, isAuthor } = require('../middlleware');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.memoryStorage(); // Store uploaded files in memory as buffers
const upload = multer({ storage });

router.get('/products/:item', isLogin, async (req, res) => {
    let type = req.params;
    let products = await Product.find({}).populate('author');
    let itemFilter = products.filter((item) => item.type == type.item);
    console.log(products)
    res.render('main/products', { itemFilter, type });
});

router.get('/products/:id/edit', isLogin, isSeller,isAuthor, async (req, res) => {
    let { id } = req.params;
    let product = await Product.findById(id);
    res.render('main/edit', { product });
});

router.patch('/products/:id',upload.single('img'),isLogin, async (req, res) => {
    let { id } = req.params;
    console.log(id);
    try {
        const { name, price, type, desc } = req.body;
        const img = req.file; // Assuming you're using multer for file upload

        // Create new product object
        await Product.findByIdAndUpdate(id,{name,
            price,
            type,
            desc,
            img: {
                data: img.buffer, // Assuming multer provides a buffer for the file data
                contentType: img.mimetype // Assuming multer provides the mimetype
            },
            author: req.user._id});
        
             // Assuming req.user._id contains the ObjectId of the author
        

        // Save the new product to the database
       

        // Redirect to a success page or send a success response
        req.flash('success', 'Product Editted Successfully');
        res.redirect('/');
    } catch (error) {
        // Handle errors
        console.error(error);
        req.flash('error', error.message);
        res.redirect('/products/cycle');
    }
});

// POST route to handle form submission and store data in the database
router.post('/products', isLogin,upload.single('img'),validateProduct,async (req, res) => {
    try {
        const { name, price, type, desc } = req.body;
        const img = req.file; // Assuming you're using multer for file upload
        
        // Create new product object
        const newProduct = new Product({
            name,
            price,
            type,
            desc,
            img: {
                data: img.buffer, // Assuming multer provides a buffer for the file data
                contentType: img.mimetype // Assuming multer provides the mimetype
            },
            author: req.user._id // Assuming req.user._id contains the ObjectId of the author
        });

        // Save the new product to the database
        await newProduct.save();

        // Redirect to a success page or send a success response
        req.flash('success', 'Product Added Successfully');
        res.redirect('/');
    } catch (error) {
        // Handle errors
        console.error(error);
        req.flash('error', 'Error occurred while adding product');
        res.redirect('/');
    }
});
router.delete('/products/:id',isAuthor,async (req,res)=>{
    let {id}=req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success','product is successfully deleted')
    res.redirect('/');
})
module.exports = router;
