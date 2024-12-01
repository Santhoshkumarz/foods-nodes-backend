const express = require("express");
const db = require("./src/config/database");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
app.use(cors());
dotenv.config();

app.use(express.json());

app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
