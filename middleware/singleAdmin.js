const Amdin=require('../model/adminModel');

const singleAdmin= async (req,res,next)=>{
    try{
        const countAdmin=Amdin.countDocuments()
        if(countAdmin>=1){
            return res.status(400).json({message:'il ne doit y avoir qu\'un seul admin'});
        }
        next();

    }catch(err){
        console.error(err);
        res.status(500).json({message:'erreur interne au serveur'});
    }

}

module.exports={singleAdmin};