const express = require("express");
const foodsRoutes = require("./routes/foodRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");

const router = express.Router();

router.use("/foods", foodsRoutes);

router.use("/food-orders", ordersRoutes);

router.use('/whatsapp', whatsappRoutes);

module.exports = router;