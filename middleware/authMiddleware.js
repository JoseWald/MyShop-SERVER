const jwt=require('jsonwebtoken')
const admin=require('../model/adminModel');

const security=async (req,res,next)=>{
    let token;

    if(req.header.authorization && req.header.authorization.startWith('Bearer')){
        try{
            token=req.header.authorization.split(' ')[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            req.user=await admin.findById(decoded.id).select('-password');

            next();

        }catch(error){
            console.error(error);
            res.status(401).json({message:'token non obtenu'})
        }
    }

    if(!token)
        res.status(401).json({message:'token fail , pas autorisé'});

}

module.exports={security};