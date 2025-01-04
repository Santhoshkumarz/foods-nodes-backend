const Food = require('../model/foodModel');

// Get all foods
exports.getAllFoods = (req, res) => {
  Food.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get food by ID
exports.getFoodById = (req, res) => {
  const { id } = req.params;
  Food.getById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send('Food not found');
    res.json(result[0]);
  });
};

// Create a new food
exports.createFood = (req, res) => {
  Food.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Food added successfully', id: result.insertId });
  });
};

// Update a food by ID
exports.updateFood = (req, res) => {
  const { id } = req.params;

  Food.updateById(id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Food not found');
    res.json({ message: 'Food updated successfully' });
  });
};

// Delete a food by ID
exports.deleteFood = (req, res) => {
  const { id } = req.params;

  Food.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Food not found');
    res.json({ message: 'Food deleted successfully' });
  });
};
