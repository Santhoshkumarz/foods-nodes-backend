const express = require('express');
const foodRoutes = require('./routes/foodRoutes');
const dailyLogRoutes = require('./routes/dailyLogRoutes');
const userRoutes = require('./routes/userRoutes'); 

const router = express.Router();

router.use('/foods', foodRoutes);
router.use('/daily-logs', dailyLogRoutes);
router.use('/users', userRoutes);

router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

module.exports = router;


module.exports = router;
