const express=require('express');

const {Sell,wishList,showWishList,deleteWish, setRecentBill}=require('../controller/saleController');

const auth = require('../middleware/authMiddleware');


const {acceptedReq}=require('../middleware/wishListMiddleware');
const {billingProtection}=require('../middleware/billingMiddleware');

const router=express.Router();

router.post('/addWishList',acceptedReq,wishList)
router.post('/sellProduct',billingProtection,Sell)
router.delete('/deleteWish',deleteWish)
router.get('/showWishList',showWishList)
router.get('/setRecentBill',setRecentBill)



module.exports=router;