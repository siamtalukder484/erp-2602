const express = require("express");
const router = express.Router();
const { protect, requiedAdmin } = require("../../middleware/authMiddleware");
const dashboardController = require("../../controllers/dashboardController")

router.get("/allusers", protect, requiedAdmin, dashboardController.getAllUserController);

module.exports = router