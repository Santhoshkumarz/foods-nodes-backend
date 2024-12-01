const db = require("../config/database");

const FoodOrder = {
  // Get all food orders
  getAll: (callback) => {
    db.query("SELECT * FROM food_orders ORDER BY created_at DESC", callback);
  },

  // Get food order by ID
  getById: (id, callback) => {
    db.query("SELECT * FROM food_orders WHERE id = ?", [id], callback);
  },

  // Create a new food order
  create: (data, callback) => {
    const { order_date, items, totalPrice } = data;
    db.query(
      "INSERT INTO food_orders (order_date, items, totalPrice, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
      [order_date, items, totalPrice], 
      callback
    );
  },
  // Update food order by ID
  update: (id, data, callback) => {
    const { order_date, items, totalPrice } = data;
    db.query(
      "UPDATE food_orders SET order_date = ?, items = ?, totalPrice = ?, updated_at = NOW() WHERE id = ?",
      [order_date, JSON.stringify(items), totalPrice, id],
      callback
    );
  },

  // Delete food order by ID
  deleteById: (id, callback) => {
    db.query("DELETE FROM food_orders WHERE id = ?", [id], callback);
  },
};

module.exports = FoodOrder;
