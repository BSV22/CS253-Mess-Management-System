// routes/configRoutes.js
const express = require("express");
const router = express.Router();
const configController = require("../controllers/configController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

router.get("/:key", protect, configController.getConfig);
router.post("/", protect, allowRoles("manager"), configController.setConfig);

module.exports = router;
