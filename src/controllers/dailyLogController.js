const DailyLog = require('../models/dailyLogModel');

// Create a new daily log
exports.createDailyLog = (req, res) => {
  const log = req.body;  // Expecting a log object with food_items as an array

  if (!log.food_items || !Array.isArray(log.food_items)) {
    return res.status(400).send({ error: 'Food items must be an array.' });
  }

  log.food_items.forEach(item => {
    if (!item.food_id || !item.quantity) {
      return res.status(400).send({ error: 'Each food item must have a food_id and quantity.' });
    }
  });

  DailyLog.create(log, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Daily log created successfully', id: result.insertId });
  });
};

// Get all daily logs with food details
exports.getAllDailyLogs = (req, res) => {
  DailyLog.getAll((err, logs) => {
    if (err) return res.status(500).send(err);
    res.json(logs);
  });
};

// Get daily log by ID with food details
exports.getDailyLogById = (req, res) => {
  const { id } = req.params;

  DailyLog.getById(id, (err, log) => {
    if (err) return res.status(500).send(err);
    if (!log) return res.status(404).send('Daily log not found');
    res.json(log);
  });
};

// Update a daily log by ID
exports.updateDailyLog = (req, res) => {
  const { id } = req.params;
  const logData = req.body;

  if (!logData.food_items || !Array.isArray(logData.food_items)) {
    return res.status(400).send({ error: 'Food items must be an array.' });
  }

  logData.food_items.forEach(item => {
    if (!item.food_id || !item.quantity) {
      return res.status(400).send({ error: 'Each food item must have a food_id and quantity.' });
    }
  });

  DailyLog.updateById(id, logData, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send('Daily log not found');
    res.json(result);
  });
};

// Delete a daily log by ID
exports.deleteDailyLog = (req, res) => {
  const { id } = req.params;
  DailyLog.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Daily log not found');
    res.json({ message: 'Daily log deleted successfully' });
  });
};

// Delete a single food item from a daily log
exports.deleteFoodItem = (req, res) => {
  const { dailyLogId, foodId } = req.params;

  DailyLog.deleteFoodItem(dailyLogId, foodId, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Daily foods log not found');
    res.json({ message: 'Daily foods log deleted successfully' });
  });
};
