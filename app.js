const express = require("express");
const db = require("./src/config/database");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", routes);

app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
