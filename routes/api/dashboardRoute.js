const express = require("express");
const router = express.Router();
const { protect, requiedAdmin } = require("../../middleware/authMiddleware");
const dashboardController = require("../../controllers/dashboardController")

router.use(protect)
router.get("/allusers", requiedAdmin, dashboardController.getAllUserController);

module.exports = router