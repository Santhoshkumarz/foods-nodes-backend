const Food = require("../model/foodModel");
const { validationResult } = require("express-validator"); 

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
    if (!result.length) return res.status(404).send("Food not found");
    res.json(result[0]);
  });
};

// Create a new food
exports.createFood = (req, res) => {
  // Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Food.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "Food added successfully" });
  });
};

// Update food by ID
exports.updateFood = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if the food item exists
  Food.getById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send("Food not found");

    // Proceed with the update
    Food.update(id, updatedData, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: "Food updated successfully" });
    });
  });
};

// Delete food by ID
exports.deleteFood = (req, res) => {
  const { id } = req.params;
  Food.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("Food not found");
    res.status(200).json({message: "Food delete successfully"});
  });
};
