const mongoose=require('mongoose');

const factureSchema=new mongoose.Schema({
    date:{
        type:Date,default: Date.now
    },
    customer:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:function (v){
                return v && v.length>0
            }
        },
        message:"Customer's name required"
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
        required:true,
        min:0
    },
    givenAmount:{
        type:Number,
        required:true,
        min:0
    },
    changeAmount:{
        type:Number,
        required:true,
        min:0
    }//tokony change fa lasa tsy clean    
})

module.exports=mongoose.model('facture',factureSchema);