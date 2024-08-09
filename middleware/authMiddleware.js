const jwt=require('jsonwebtoken')
const admin=require('../model/adminModel');
const JWT_SECRET=require('../env/JWTSecret')

const protectedData=async (req,res,next)=>{
    let token=req.headers['authorization']?.replace('Bearer','').trim();

    if(!token)
        res.status(401).json({message:'token fail , pas autorisé'});

    try{
        const decoded=jwt.verify(token,JWT_SECRET);
         //const decoded=jwt.decode(token,JWT_SECRET);
        req.user=decoded.user;
        next();

    }catch(err){
        res.status(401).json({message:`token invalid ${err.message}`})
    }

}

module.exports=protectedData;