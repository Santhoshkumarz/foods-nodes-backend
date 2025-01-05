const express = require("express");
const db = require("./src/config/database");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// API Routes
app.use("/api", routes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Export the app for Vercel serverless deployment
module.exports = app;
