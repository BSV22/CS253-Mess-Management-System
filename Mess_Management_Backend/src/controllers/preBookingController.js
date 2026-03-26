// controllers/preBookingController.js
const { PreBooking, Student } = require("../models/Index");

exports.bookItem = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students allowed" });
    }

    const { dishName, meal, date, SpecialItemId } = req.body;
    if (!dishName || !meal || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = await PreBooking.create({
      StudentRollNo: req.user.rollNo,
      dishName,
      meal,
      date,
      SpecialItemId,
      status: "Pending"
    });

    res.json({ message: "Item pre-booked successfully", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await PreBooking.findAll({
      where: { StudentRollNo: req.user.rollNo },
      order: [["date", "DESC"]]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }
    const bookings = await PreBooking.findAll({
      include: [{ model: Student }],
      order: [["date", "DESC"]]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
