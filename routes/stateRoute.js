const express = require('express');
const router = express.Router();
const { prodNbr, dailyGain, stockToReplenish, outOfStock } = require('../controller/statController');


router.get('/product-count', prodNbr);
router.get('/daily-gain', dailyGain);
router.get('/stock-to-replenish', stockToReplenish);
router.get('/out-of-stock', outOfStock);

module.exports = router;
