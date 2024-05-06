const express=require('express');

const Car = require('../../models/Car');
const { isLogin, isAuthor2, isSeller } = require('../../middlleware');
const router=express.Router();

router.post('/car/:id/add',isLogin,isSeller,isAuthor2,async(req,res)=>{
    let {id}=req.params; 
    let car = await Car.findById(id);
    if (!car) {
        
        return res.status(404).send("Car not found");
    }
    car.seat += 1;
   
    await Car.findByIdAndUpdate(id, { $set: { seat: car.seat } });
    
    
})
router.post('/car/:id/minus',isLogin,isSeller,isAuthor2,async(req,res)=>{
    let {id}=req.params; 
    let car = await Car.findById(id);
    if (!car) {
        return res.status(404).send("Car not found");
    }
    car.seat -= 1;
   
    await Car.findByIdAndUpdate(id, { $set: { seat: car.seat } });
    
    
})

module.exports=router;