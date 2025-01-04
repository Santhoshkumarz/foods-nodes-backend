const User = require('../model/userModel');

exports.createUser = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  User.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result.length) return res.status(404).send('User not found');
    res.json(result[0]);
  });
};

exports.updateUser = (req, res) => {
  User.updateById(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User updated successfully' });
  });
};

exports.deleteUser = (req, res) => {
  User.deleteById(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('User not found');
    res.json({ message: 'User deleted successfully' });
  });
};
