const mongoose=require('mongoose');

const statSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    totalSales:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('weeklyState',statSchema);