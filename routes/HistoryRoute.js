const express=require('express');

const {saleHistory}=require('../controller/History');

const router=express.Router()

router.get('/getSaleHistory',saleHistory);

module.exports=router;