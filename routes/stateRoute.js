const express = require('express');

const { prodNbr, dailyGain, stockToReplenish, outOfStock , mostSelled , scheduleDailyCleanup , getWeeklyStat} = require('../controller/statController');
const router = express.Router();

router.get('/product-count', prodNbr);
router.get('/daily-gain', dailyGain);
router.get('/stock-to-replenish', stockToReplenish);
router.get('/out-of-stock', outOfStock);
router.get('/most-selled',mostSelled);
router.post('/cleanup',scheduleDailyCleanup)
router.get('/weekly-stat',getWeeklyStat)

module.exports = router;
