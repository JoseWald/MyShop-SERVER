const mongoose=require('mongoose');

const wishListSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
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
    }

})

module.exports=mongoose.model('wishList',wishListSchema);