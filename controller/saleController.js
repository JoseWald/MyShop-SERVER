const Product=require('../model/prodModel');
const Facture=require('../model/factureModel');
const whisList=require('../model/wishList');


exports.Sell= async(req,res)=>{
    let totalAmount=0;
    const {givenAmount,customer,purchasedProduct}=req.body;
    const date=new Date.now;
    try{
        const Products=await Promise.all(purchasedProduct.map(async(prod)=>{
            const product=await Product.find({name:prod.name});
            if(product && prod.quantity<=product.quantity){
                    totalAmount+=product.price*prod.quantity;
                    if(totalAmount<=givenAmount){
                        const prodQuantity=product.quantity-prod.quantity;
                        const prodName=product.name;
                        const prodPrice=product.price;
                        const prodMax=product.max;

                        const update={
                            prodPrice,
                            prodMax,
                            prodQuantity
                        }

                        await Product.findOneAndUpdate(
                            {prodName},update,{new:true,runValidators:true}
                        );

                    }else{
                        return res.status(400).json({message:"The given money can't afford the wished product"});
                    }

                    const change=givenAmount-totalAmount;

                    const facture=new Facture({
                        date,
                        customer,
                        Products,
                        totalAmount,
                        givenAmount,
                        change
                    })

                    await facture.save();

            }else if(!product){
                    return res.status(404).json({message:"Product not found"});
            }else{
                return res.status(400).json({message:`No more enough ${product.name}`});
            }
        }))
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.wishList=async (req,res)=>{
    const {name,number}=req.body

    try{
        const nameFound=await whisList.findOne({name:name});
        if(nameFound){
            await nameFound.findOneAndUpdate(
                {name},{number},{new:true,runValidators:true}
            )
        }else{
            await nameFound.create({name,number});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
  
}