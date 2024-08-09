const express=require('express');
const { prodList , addProd , deleteProd , updateProd }=require('../controller/prodController');
const router=express.Router();

const {uniqueProd}=require('../middleware/uniqueProdMiddleware');

router.get('/prodList',prodList);
router.post('/addProd',uniqueProd,addProd);
router.delete('/deleteProd',deleteProd);
router.put('/updateProd',updateProd);

module.exports=router;