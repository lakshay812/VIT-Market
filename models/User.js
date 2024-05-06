const mongoose=require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema=new mongoose.Schema({    
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"seller"
    } 
})
userSchema.plugin(passportLocalMongoose);
let User=mongoose.model('User',userSchema);
module.exports=User;
