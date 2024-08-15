const express=require('express');
const { prodList , addProd , deleteProd , updateProd }=require('../controller/prodController');
const router=express.Router();

const {uniqueProd}=require('../middleware/uniqueProdMiddleware');
const {validatedQuantity}=require('../middleware/quentityProtection');

const auth = require('../middleware/authMiddleware');


router.get('/prodList',prodList);
router.post('/addProd',uniqueProd,addProd);
router.delete('/deleteProd',deleteProd);
router.put('/updateProd',uniqueProd,validatedQuantity,updateProd);

module.exports=router;