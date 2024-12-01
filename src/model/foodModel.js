const db = require('../config/database');

const Food = {
  getAll: (callback) => {
    db.query('SELECT * FROM foods', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM foods WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    const { image, name, quantity, price, meal_type } = data;
    db.query(
      'INSERT INTO foods (image, name, quantity, price, meal_type) VALUES (?, ?, ?, ?, ?)',
      [image, name, quantity, price, meal_type],
      callback
    );
  },
  update: (id, data, callback) => {
    const { image, name, quantity, price, meal_type } = data;
    db.query(
      'UPDATE foods SET image = ?, name = ?, quantity = ?, price = ?, meal_type = ? WHERE id = ?',
      [image, name, quantity, price, meal_type, id],
      callback
    );
  },
  deleteById: (id, callback) => {
    db.query('DELETE FROM foods WHERE id = ?', [id], callback);
  }
};

module.exports = Food;
