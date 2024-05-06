const mongoose=require('mongoose');


const carSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    carName:{
        type:String,
        required:true
    },
    
    seat:{
        type:Number,
        required:true,
        min:1    
    },
    
    email:{
        type:String,   
    },
    phone:{
        type:Number,
        required:true
    },
    upperCarriage:{
        type:Boolean
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },time:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    }
    
    
    
})

let Car=mongoose.model('Car',carSchema);
module.exports=Car;
