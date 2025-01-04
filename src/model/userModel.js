const db = require('../config/database');

const User = {
  create: (data, callback) => {
    const { username, email, phone_number, password, api_token } = data;
    db.query(
      'INSERT INTO users (username, email, phone_number, password, api_token) VALUES (?, ?, ?, ?, ?)',
      [username, email, phone_number, password, api_token],
      callback
    );
  },
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },
  updateById: (id, data, callback) => {
    const { username, email, phone_number, password, api_token } = data;
    db.query(
      'UPDATE users SET username = ?, email = ?, phone_number = ?, password = ?, api_token = ? WHERE id = ?',
      [username, email, phone_number, password, api_token, id],
      callback
    );
  },
  deleteById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err);
      if (result.length === 0) return callback(null, { affectedRows: 0 });
  
      db.query('DELETE FROM users WHERE id = ?', [id], callback);
    });
  },
  
};

module.exports = User;
