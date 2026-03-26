// controllers/voteController.js

const Vote = require("../models/Vote");
const Poll = require("../models/Poll");
const PollOption = require("../models/PollOption");


exports.castVote = async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Only students can vote" });
    }

    const { pollId, votes } = req.body;
    const studentId = req.user.rollNo;

    // check poll
    const poll = await Poll.findByPk(pollId);
    if (!poll || poll.status !== "active") {
      return res.status(400).json({ error: "Voting not active" });
    }

    // check full selection
    if (!votes.Breakfast || !votes.Lunch || !votes.Dinner) {
      return res.status(400).json({
        error: "Select option for all meal types",
      });
    }

    // check already voted
    const existing = await Vote.findOne({
      where: { PollId: pollId, StudentRollNo: studentId },
    });

    if (existing) {
      return res.status(400).json({ error: "Already voted" });
    }

    // validate and insert votes
    for (const mealType in votes) {
      const optionId = votes[mealType];

      const option = await PollOption.findOne({
        where: { id: optionId, PollId: pollId, mealType },
      });

      if (!option) {
        return res.status(400).json({
          error: `Invalid option for ${mealType}`,
        });
      }

      // save vote
      await Vote.create({
        PollId: pollId,
        PollOptionId: optionId,
        StudentRollNo: studentId,
      });

      // increment vote count
      await option.increment("votes");
    }

    res.json({ message: "Vote submitted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};