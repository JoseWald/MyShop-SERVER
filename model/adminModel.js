const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },

});

adminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password.hash,salt);
    next();
})

adminSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports=mongoose.model('admin',adminSchema);