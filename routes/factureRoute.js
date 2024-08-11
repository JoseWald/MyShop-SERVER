const express=require('express');

const {Sell,wishList,showWishList,deleteWish}=require('../controller/saleController');


const {acceptedReq}=require('../middleware/wishListMiddleware');

const router=express.Router();

router.post('/addWishList',acceptedReq,wishList)
router.post('/sellProduct',Sell)
router.delete('/deleteWish',deleteWish)
router.get('/showWishList',showWishList)


module.exports=router;