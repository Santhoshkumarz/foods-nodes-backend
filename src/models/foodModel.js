// models/foodModel.js
const db = require("../config/database");

const Food = {
  create: (data, callback) => {
    const { name, price, category_id, image_url, availability } = data;
    db.query(
      "INSERT INTO foods (name, price, category_id, image_url, availability) VALUES (?, ?, ?, ?, ?)",
      [name, price, category_id, image_url, availability],
      callback
    );
  },
  getAll: (callback) => {
    db.query("SELECT * FROM foods", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM foods WHERE id = ?", [id], callback);
  },
  updateById: (id, data, callback) => {
    const { name, price, category_id, image_url, availability } = data;
    db.query(
      "UPDATE foods SET name = ?, price = ?, category_id = ?, image_url = ?, availability = ? WHERE id = ?",
      [name, price, category_id, image_url, availability, id],
      callback
    );
  },
  deleteById: (id, callback) => {
    db.query("DELETE FROM foods WHERE id = ?", [id], callback);
  },
};

module.exports = Food;
