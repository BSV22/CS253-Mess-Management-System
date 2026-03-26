// routes/menuRoutes.js

const express = require("express");
const router = express.Router();

const menuController = require("../controllers/menuController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// manager
router.post("/set", protect, allowRoles("manager"), menuController.setWeeklyMenu);
router.put("/day/:day", protect, allowRoles("manager"), menuController.updateDayMenu);
router.put("/:day/:mealType",protect,allowRoles("manager"),menuController.updateMenuSlot);

// everyone
router.get("/", protect, menuController.getWeeklyMenu);
router.get("/today", protect, menuController.getTodayMenu);

module.exports = router;