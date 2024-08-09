const mongoose=require('mongoose');

const factureSchema=new mongoose.Schema({
    date:{
        type:Date,default: Date.now
    },
    customer:{
        type:String,
        required:true
    },
    products:[{
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    givenAmount:{
        type:Number,
        required:true
    },
    changeAmount:{
        type:Number,
        required:true
    }//tokony change fa lasa tsy clean    
})

module.exports=mongoose.model('facture',factureSchema);