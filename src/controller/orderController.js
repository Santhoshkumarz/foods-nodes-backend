const FoodOrder = require('../model/orderModel');
const { validationResult } = require('express-validator');

// Get all food orders
exports.getAllFoodOrders = (req, res) => {
  FoodOrder.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get food order by ID
exports.getFoodOrderById = (req, res) => {
  const { id } = req.params;
  FoodOrder.getById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send('Food Order not found');
    res.json(result[0]);
  });
};

// Create a new food order
exports.createFoodOrder = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { order_date, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Items array cannot be empty' });
  }

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const order = {
    order_date,
    items: JSON.stringify(items), // Ensure the items array is stringified
    totalPrice,
  };

  FoodOrder.create(order, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Food order created successfully', orderId: result.insertId });
  });
};


// Update food order by ID
exports.updateFoodOrder = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  FoodOrder.getById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send('Food Order not found');

    FoodOrder.update(id, updatedData, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: 'Food order updated successfully' });
    });
  });
};

// Delete food order by ID
exports.deleteFoodOrder = (req, res) => {
  const { id } = req.params;
  FoodOrder.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Food Order not found');
    res.status(200).json({ message: 'Food order deleted successfully' });
  });
};
