const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        reqired:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
    },
    type:{
        type:String,
        required:true
    },
    img:
        { data: Buffer, contentType: String }
    ,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

    
},{
    timestamps:true
})
const Product=mongoose.model('Product',productSchema)
module.exports=Product;
