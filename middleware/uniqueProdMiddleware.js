const Prod=require('../model/prodModel');

const uniqueProd=async (req,res,next)=>{
    const {name}=req.body;   
     try{
        const existingProd= await Prod.findOne({name:name})
        if(existingProd && existingProd.name!=name){
            return res.status(400).json({message:'This product already exist'});
        }

        next();

    }catch(err){
        res.status(500).json({message:'internal server error'});
    }
}

module.exports={uniqueProd};