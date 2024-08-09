const express=require('express');
const {register,login}=require('../controller/authController');

const protectedData=require('../middleware/authMiddleware');
const {singleAdmin}=require('../middleware/singleAdmin');


const router=express.Router();

router.post('/register',singleAdmin,register);
router.post('/login',login);

router.get('/protecteddata',protectedData,(req,res)=>{res.json({message:"token accessible"})});

module.exports=router;