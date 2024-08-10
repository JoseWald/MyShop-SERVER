const mongoose=require('mongoose');

const wishListSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    number:{
        type:Number,
        required:true,
        min:[0,'quantité négatif non autorisé']
    }

})

module.exports=mongoose.model('whisList',wishListSchema);