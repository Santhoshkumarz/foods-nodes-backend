// routes/foodRoutes.js
const express = require("express");
const foodController = require("../controllers/foodController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/", foodController.getAllFoods);
router.get("/:id", foodController.getFoodById);
router.post("/", upload.single("image"), foodController.createFood);
router.put("/:id", upload.single("image"), foodController.updateFood);
router.delete("/:id", foodController.deleteFood);

module.exports = router;
