const Prod=require('../model/prodModel');

const validatedQuantity=async (err,req,res,next)=>{
    const  {name,quantity}=req.body;
    try{
            const prodQaunt=await Prod.findOne({name});
            if(!prodQaunt){
               return res.status(404).json({message:'product not found'});
            }
            if(quantity<prodQaunt){
              return  res.status(400).json({message:"Cannot substract a product without selling it"});
            }
            next();
    }catch(err){
            res.status(500).json({message:err.message});
    }

}
module.exports={validatedQuantity};