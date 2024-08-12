const Product = require('../model/prodModel');
const Facture = require('../model/factureModel');
const WishList = require('../model/wishList');

exports.Sell = async (req, res) => {
    let totalAmount = 0;
    const { givenAmount, customer } = req.body;
    const date = new Date();
    const validateCustomer=customer.trim();
    
    try {
        const purchasedProducts = await WishList.find({});
        console.log('purchasedProd'+purchasedProducts)
        for (const prod of purchasedProducts) {
            const product = await Product.findOne({ name: prod.name });
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            if (prod.quantity > product.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }

            totalAmount += product.price * prod.quantity;
            
            if (totalAmount > givenAmount) {
                return res.status(400).json({ message: "The given money can't afford the wished product" });
            }

            const updatedQuantity = product.quantity - prod.quantity;
            const update = { quantity: updatedQuantity };

            await Product.findOneAndUpdate(
                { name: product.name },
                update,
                { new: true, runValidators: true }
            );
        }

        const change = Number(givenAmount - totalAmount);

        const facture = new Facture({
            date:date,
            customer:validateCustomer,
            products: purchasedProducts,
            totalAmount:totalAmount,
            givenAmount:givenAmount,
            changeAmount:change
        });

        await facture.save()
                .then(ok=>{console.log('ok')})
                .catch(err=>{res.status(400).json({message:err.message})})
        await WishList.deleteMany({});

        res.status(200).json({ success: true, message: "Sale completed" });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.wishList = async (req, res) => {
    const { name, quantity , price } = req.body;

    try {
        const existingItem = await WishList.findOne({ name });

        if (existingItem) {
            await WishList.updateOne(
                { name },
                { quantity },
                {price},
                { new: true, runValidators: true }
            );
        } else {
            await WishList.create({ name, quantity , price});
        }
        
        res.status(201).json({ success: true, message: "Wish list updated" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.showWishList=async (req,res)=>{
    try{
        const wishList= await WishList.find().sort({name:1});
        res.status(200).json({message:wishList});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.deleteWish=async (req,res)=>{
    const {name}=req.body;
    try{
        const delWish= await WishList.findOneAndDelete({name})
        if(!delWish){
            res.status(404).json({message:'Product not found'});
        }else{
            res.status(200).json({message:'product deleted successfully'});
        }
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.setRecentBill=async (req,res)=>{
    try{
        const recentSale= await Facture.findOne().sort({_id:-1}).exec();
        res.status(200).json({message:recentSale});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}
