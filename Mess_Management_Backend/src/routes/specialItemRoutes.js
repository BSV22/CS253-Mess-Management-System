const express = require("express");
const router = express.Router();
const specialItemController = require("../controllers/specialItemController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth.protect, specialItemController.createSpecialItem);
router.get("/available", auth.protect, specialItemController.getAvailableItems);
router.put("/toggle/:id", auth.protect, specialItemController.toggleAvailability);
router.delete("/:id", auth.protect, specialItemController.deleteSpecialItem);

module.exports = router;
