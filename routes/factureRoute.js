const express=require('express');

const {Sell}=require('../controller/saleController');
const {wishList}=require('../controller/saleController');

const {acceptedReq}=require('../middleware/wishListMiddleware');

const router=express.Router();

router.post('/addWishList',acceptedReq,wishList)
router.post('/sellProduct',Sell)


module.exports=router;