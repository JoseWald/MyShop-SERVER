const mongoose=require('mongoose');

const connectDB=async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/MyShopDB');
        console.log('MyShopDB connected');

    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

module.exports={connectDB};