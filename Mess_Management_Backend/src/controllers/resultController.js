// controllers/resultController.js

const PollOption = require("../models/PollOption");

exports.getPollResults = async (req, res) => {
  try {
    const options = await PollOption.findAll({
      where: { PollId: req.params.id },
    });

    const result = {};

    options.forEach((opt) => {
      if (!result[opt.mealType]) result[opt.mealType] = [];

      result[opt.mealType].push({
        option: opt.name,
        votes: opt.votes,
      });
    });

    // calculate percentage
    for (const meal in result) {
      const total = result[meal].reduce((sum, o) => sum + o.votes, 0);

      result[meal] = result[meal].map((o) => ({
        ...o,
        percentage: total ? ((o.votes / total) * 100).toFixed(2) : 0,
      }));
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};