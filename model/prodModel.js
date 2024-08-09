const mongoose=require('mongoose');

const produitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:[0,'prix négatif non autorisé']
    },
    quantity:{
        type:Number,
        required:true,
        min:[0,'quantité négatif non autorisé']
    },
    max:{
        type:Number,
        required:true,
        min:[0,'quantité négatif non autorisé']
    }
})

const produit=mongoose.model('product',produitSchema);