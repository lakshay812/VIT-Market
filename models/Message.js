const mongoose=require('mongoose');


const messageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String  
    }
    
    
    
})

let Message=mongoose.model('Message',messageSchema);
module.exports=Message;
