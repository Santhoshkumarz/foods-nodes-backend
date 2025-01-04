require('dotenv').config();  // Load environment variables from .env file

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

module.exports = connection;
