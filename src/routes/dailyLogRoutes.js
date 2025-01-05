const express = require('express');
const dailyLogController = require('../controllers/dailyLogController');

const router = express.Router();

router.get('/', dailyLogController.getAllDailyLogs);
router.get('/:id', dailyLogController.getDailyLogById);
router.post('/', dailyLogController.createDailyLog);
router.put('/:id', dailyLogController.updateDailyLog);
router.delete('/:id', dailyLogController.deleteDailyLog);
router.delete('/:dailyLogId/food/:foodId', dailyLogController.deleteFoodItem);

module.exports = router;
