const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    price: Joi.number().required(),
    desc: Joi.string(),
    type: Joi.string().required(),
    author: Joi.string().pattern(/^[0-9a-fA-F]{24}$/) // Assuming author is a MongoDB ObjectId
});

const messageSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().integer().allow(null), // Assuming phone number can be null or an integer
    email: Joi.string().email().required(),
    message: Joi.string().allow('') // Allowing an empty string for the message field
});
const userSchema = Joi.object({
    phone: Joi.number().required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid('seller').default('seller') // Assuming type can only be 'seller' and defaults to 'seller'
});
const carSchema = Joi.object({
    name: Joi.string().required(),
    carName: Joi.string().required(),
    seat: Joi.number().required().min(0),
    email: Joi.string().email(),
    phone: Joi.number().required(),
    upperCarriage: Joi.string().allow(''),
    price: Joi.number().required(),
    date: Joi.string().required(),
    author: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // Assuming author is a MongoDB ObjectId
    time: Joi.string().required(),
    source: Joi.string().required(),
    destination: Joi.string().required()
});

module.exports = {productSchema,messageSchema,userSchema,carSchema};