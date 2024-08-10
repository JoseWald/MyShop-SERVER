const Prod=require('../model/prodModel');

const acceptedReq=async (err,req,res,next)=>{
    const {name,number}=req.body
    try{
        const prod=await Prod.find({name:name});
        if(!prod){
            return res.status(404).json({message:"wished product not found"});
        }

        if(number<=0){
            return res.status(404).json({message:"negative or null wishList's number denied"});
        }

        next();
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports={acceptedReq};