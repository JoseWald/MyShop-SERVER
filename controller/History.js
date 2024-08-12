const Facture = require('../model/factureModel');

exports.saleHistory=async (req,res)=>{
    try{
        const res=await Facture.find().sort({date:1,customer:1});
        res.status(200).json({message:res});
    }catch(err){
        res.status(500).json({message:err.message});
    }

}