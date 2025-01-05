// controllers/foodController.js
const path = require("path");
const Food = require("../models/foodModel");

exports.getAllFoods = (req, res) => {
  Food.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getFoodById = (req, res) => {
  const { id } = req.params;
  Food.getById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send("Food not found");
    res.json(result[0]);
  });
};

exports.createFood = (req, res) => {
  const { name, price, category_id, availability } = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = "/uploads/" + req.file.filename;
  }

  Food.create(
    { name, price, category_id, image_url: imageUrl, availability },
    (err, result) => {
      if (err) return res.status(500).send(err);
      res
        .status(201)
        .json({ message: "Food added successfully", id: result.insertId });
    }
  );
};

exports.updateFood = (req, res) => {
  const { id } = req.params;
  const { name, price, category_id, availability } = req.body;
  let imageUrl = null;

  if (req.file) {
    imageUrl = "/uploads/" + req.file.filename;
  }

  Food.updateById(
    id,
    { name, price, category_id, image_url: imageUrl, availability },
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0)
        return res.status(404).send("Food not found");
      res.json({ message: "Food updated successfully" });
    }
  );
};

exports.deleteFood = (req, res) => {
  const { id } = req.params;
  Food.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("Food not found");
    res.json({ message: "Food deleted successfully" });
  });
};
