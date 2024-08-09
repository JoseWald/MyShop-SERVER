const Admin=require('../model/adminModel');
const jwt=require('jsonwebtoken');
const JWT_SECRET=require('../env/JWTSecret');

exports.register=async (req,res)=>{
    const {username,password}=req.body;
    try{
        const admin=await Admin.create({username,password});
        const token=jwt.sign({adminId:admin._id},JWT_SECRET,{
            expiresIn:'1h',
        });

        res.status(201).json({
            success:true,
            token
        });
        
    }catch(err){
        res.status(400).json({succes:false,message:err.message});
    }
}

exports.login=async (req,res)=>{
        const {username,password}=req.body;
        
        try{
            const admin=await Admin.findOne({username});
            if(!admin || !admin.matchPassword(password)){
                res.status(401).json({ success:false,message:'accès interdit'});
            }
            const token=jwt.sign({adminId:admin._id},JWT_SECRET,{
                expiresIn:'1h',
            });

            res.status(201).json({
                success:true,
                token
            });

        }catch(error){
            res.status(400).json({succes:false , message:error.message});
        }
}
