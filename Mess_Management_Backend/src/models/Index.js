const Student = require('./Student');
const Feedback = require('./Feedback');
const Rebate = require('./Rebate');
const Poll = require('./Poll');
const PollOption = require('./PollOption');
const Vote = require('./Vote');
const ExtraItem = require("./ExtraItem");
const ExtraPurchase = require("./ExtraPurchase");
const Transaction = require("./Transaction");
const Config = require("./Config");
const PreBooking = require("./PreBooking");
const SpecialItem = require("./SpecialItem");

// Student associations
Student.hasMany(Feedback, { foreignKey: 'StudentRollNo' });
Feedback.belongsTo(Student, { foreignKey: 'StudentRollNo' });

Student.hasMany(Rebate, { foreignKey: 'StudentRollNo' });
Rebate.belongsTo(Student, { foreignKey: 'StudentRollNo' });

Student.hasMany(Vote, { foreignKey: 'StudentRollNo' });
Vote.belongsTo(Student, { foreignKey: 'StudentRollNo' });

Student.hasMany(ExtraPurchase, { foreignKey: 'StudentRollNo' });
ExtraPurchase.belongsTo(Student, { foreignKey: 'StudentRollNo' });

Student.hasMany(Transaction, { foreignKey: 'StudentRollNo' });
Transaction.belongsTo(Student, { foreignKey: 'StudentRollNo' });

Student.hasMany(PreBooking, { foreignKey: 'StudentRollNo' });
PreBooking.belongsTo(Student, { foreignKey: 'StudentRollNo' });

// Poll associations
Poll.hasMany(PollOption, { foreignKey: 'PollId' });
PollOption.belongsTo(Poll, { foreignKey: 'PollId' });

PollOption.hasMany(Vote, { foreignKey: 'PollOptionId' });
Vote.belongsTo(PollOption, { foreignKey: 'PollOptionId' });

Poll.hasMany(Vote, { foreignKey: 'PollId' });
Vote.belongsTo(Poll, { foreignKey: 'PollId' });

// Extra Item associations
ExtraItem.hasMany(ExtraPurchase, { foreignKey: 'ExtraItemId' });
ExtraPurchase.belongsTo(ExtraItem, { foreignKey: 'ExtraItemId' });

// Special Item / Pre-booking associations
SpecialItem.hasMany(PreBooking, { foreignKey: 'SpecialItemId' });
PreBooking.belongsTo(SpecialItem, { foreignKey: 'SpecialItemId' });

module.exports = {
  Student,
  Feedback,
  Rebate,
  Poll,
  PollOption,
  Vote,
  ExtraItem,
  ExtraPurchase,
  Transaction,
  Config,
  PreBooking,
  SpecialItem
};