const express=require('express');
const {register,login,getProfile}=require('../controller/authController');
const {security}=require('../middleware/authMiddleware');

const router=express.Router();

router.post('/register',register);
router.post('/login',login);

module.exports={router};