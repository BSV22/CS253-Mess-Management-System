const { Student, Rebate, Poll, PreBooking } = require("../models/Index");
const { Op } = require("sequelize");

exports.getManagerStats = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }

    const totalStudents = await Student.count();
    const pendingRebates = await Rebate.count({ where: { status: "Pending" } });
    const activePolls = await Poll.count(); // Could filter by expiration if field exists
    const newPersonRequests = await Student.count({ where: { status: "Pending" } });
    
    // Today's Pre-bookings
    const today = new Date().toISOString().split('T')[0];
    const todaysPrebookings = await PreBooking.count({ where: { date: today } });

    res.json({
      totalStudents,
      pendingRebates,
      activePolls,
      newPersonRequests,
      todaysPrebookings
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
