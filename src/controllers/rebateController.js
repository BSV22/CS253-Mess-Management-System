// controllers/rebateController.js

const Rebate = require("../models/Rebate");
const Student = require("../models/Student");
const { Op } = require("sequelize");

exports.applyRebate = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students allowed" });
    }

    const { startDate, endDate, reason } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "Start date and end date required"
      });
    }

    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        error: "Invalid date range"
      });
    }

    const overlap = await Rebate.findOne({
      where: {
        StudentRollNo: req.user.rollNo,
        status: "Approved",
        startDate: {
          [Op.lte]: endDate
        },
        endDate: {
          [Op.gte]: startDate
        }
      }
    });

    if (overlap) {
      return res.status(400).json({
        error: "Rebate overlaps with already approved request"
      });
    }

    const rebate = await Rebate.create({
      StudentRollNo: req.user.rollNo,
      startDate,
      endDate,
      reason,
      status: "Pending"
    });

    res.json({
      message: "Rebate request submitted",
      rebate
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyRebates = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students allowed" });
    }

    const rebates = await Rebate.findAll({
      where: { StudentRollNo: req.user.rollNo },
      order: [["createdAt", "DESC"]]
    });

    res.json(rebates);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRebates = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }

    const rebates = await Rebate.findAll({
      include: [{ model: Student }],
      order: [["createdAt", "DESC"]]
    });

    res.json(rebates);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingRebates = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }

    const rebates = await Rebate.findAll({
      where: { status: "Pending" },
      include: [{ model: Student }]
    });

    res.json(rebates);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApprovedRebates = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }

    const rebates = await Rebate.findAll({
      where: { status: "Approved" },
      include: [{ model: Student }]
    });

    res.json(rebates);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveRebate = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }

    const rebate = await Rebate.findByPk(req.params.id);

    if (!rebate) {
      return res.status(404).json({ error: "Rebate not found" });
    }

    rebate.status = "Approved";
    await rebate.save();

    res.json({
      message: "Rebate approved",
      rebate
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectRebate = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }

    const rebate = await Rebate.findByPk(req.params.id);

    if (!rebate) {
      return res.status(404).json({ error: "Rebate not found" });
    }

    rebate.status = "Rejected";
    await rebate.save();

    res.json({
      message: "Rebate rejected",
      rebate
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
