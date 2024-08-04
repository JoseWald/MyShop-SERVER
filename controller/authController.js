const Admin=require('../model/adminModel');
const jwt=require('jsonwebtoken');

exports.register=async (req,res)=>{
    const {username,password}=req.body;

    try{

    }catch(err){
        res.status(400).json({succes:false,message:err.message});
    }
}