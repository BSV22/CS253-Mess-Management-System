// routes/studentRoutes.js

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// manager only
router.get("/pending", protect, allowRoles("manager"), studentController.getPendingStudents);
router.get("/approved", protect, allowRoles("manager"), studentController.getApprovedStudents);
router.get("/", protect, allowRoles("manager"), studentController.getAllStudents);

router.put("/approve/:rollNo", protect, allowRoles("manager"), studentController.approveStudent);
router.put("/reject/:rollNo", protect, allowRoles("manager"), studentController.rejectStudent);
router.delete("/:rollNo", protect, allowRoles("manager"), studentController.deleteStudent);

module.exports = router;