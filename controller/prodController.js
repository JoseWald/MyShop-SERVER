const Product=require('../model/prodModel');

exports.prodList=async (req,res)=>{
    try{
        const Products= await Product.find().sort({name:1});
        res.status(200).json({message:Products});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.addProd=async (req,res)=>{
    const {name,price,quantity}=req.body;
    try{
        if(price<=0 || quantity<=0){
            return res.status(400).json({message:'valeur négatif non accepté'});
        }
        const prod=await Product.create({name,price,quantity,quantity});//quantity should be the first maximal value
        res.status(201).json({succses:true,message:prod});
    }catch(err){
        res.status(400).json({succes:false,message:err.message});
    }
}

exports.deleteProd=async (req,res)=>{
    try{
        const delProd= await Product.findOneAndDelete({name:req.body})
        if(!delProd){
            res.status(404).json({message:'Produit introuvable'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }

}

exports.updateProd=async (req,res)=>{
    const {name,price,quantity}=req.body;
    try{
        const prodName=await Product.findOne({name})
        if(!name){
           return res.status(404).json({message:'Product not found'})
        }

        const max=prodName.quantity<quantity?quantity:prodName.quantity;

        const update={
            price:price,
            quantity:quantity,
            max:max
        }
        const updateProduct=await Product.findOneAndUpdate(
            {name},update,{new:true,runValidators:true}
        )
        res.status(201).json({succses:true,message:updateProduct});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}