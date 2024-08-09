const express=require('express');

const {Sell}=require('../controller/saleController');

const router=express.Router();

router.post('/sellProduct',Sell)

module.exports=router;