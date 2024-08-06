const jwt=require('jsonwebtoken')
const admin=require('../model/adminModel');

const security=async (req,res,next)=>{
    let token=req.header('Authorization').replace('Bearer','');

    if(!token)
        res.status(401).json({message:'token fail , pas autorisé'});

    try{
        const decoded=jwt.decode(token,process.env.JWT);
        req.user=decoded.user;
        next();

    }catch(err){
        res.status(401).json({message:'token invalid',error:err})
    }

}

module.exports={security};