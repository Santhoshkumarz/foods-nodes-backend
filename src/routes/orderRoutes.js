const express = require('express');
const router = express.Router();
const foodOrderController = require('../controller/orderController');

// Define the routes
router.get('/', foodOrderController.getAllFoodOrders);
router.get('/:id', foodOrderController.getFoodOrderById);
router.post('/', foodOrderController.createFoodOrder);
router.put('/:id', foodOrderController.updateFoodOrder);
router.delete('/:id', foodOrderController.deleteFoodOrder);

module.exports = router;
