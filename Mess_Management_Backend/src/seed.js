const sequelize = require('./config/db');
const Student = require('./models/Student');
const MessManager = require('./models/MessManager');
const Menu = require('./models/Menu');
const Feedback = require('./models/Feedback');
const Transaction = require('./models/Transaction');
const RebateRequest = require('./models/Rebate');
const ExtraItem = require('./models/ExtraItem');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); 

    console.log('⏳ Seeding Managers & Students...');
    await MessManager.bulkCreate([
      { adminId: 'ADMIN01', name: 'Ujjwal Kajal', password: 'hashedpassword', role: 'Admin' }
    ]);

    await Student.bulkCreate([
      { rollNo: '240252', name: 'B Mahath', email: 'bmahath24@iitk.ac.in', password: 'pwd', roomNo: 'A-101', messCardStatus: 'Active' },
      { rollNo: '240804', name: 'Priyanshi Meena', email: 'priyanshim24@iitk.ac.in', password: 'pwd', roomNo: 'B-205', messCardStatus: 'Active' },
      { rollNo: '240484', name: 'Rishith Jalagam', email: 'rishithjs24@iitk.ac.in', password: 'pwd', roomNo: 'C-301', messCardStatus: 'Suspended' }
    ]);

    console.log('⏳ Seeding Menu & Extras...');
    await Menu.bulkCreate([
      { date: '2026-03-20', mealType: 'Breakfast', items: 'Poha, Sambar, Idli (4 pcs), Tea/Coffee', voteCount: 45 },
      { date: '2026-03-20', mealType: 'Dinner', items: 'Roti, Rice, Rajma Masala, Aloo Gobi', voteCount: 89 }
    ]);

    await ExtraItem.bulkCreate([
      { itemName: 'Paneer Curry', price: 50.00, stockQuantity: 20, isAvailable: true },
      { itemName: 'Ice Cream', price: 30.00, stockQuantity: 50, isAvailable: true }
    ]);

    console.log('⏳ Seeding Transactions, Rebates & Feedback...');
    await Transaction.bulkCreate([
      { studentRollNo: '240252', itemName: null, amount: 4500.00, type: 'Monthly Fee', status: 'Completed' },
      { studentRollNo: '240252', itemName: 'Paneer Curry', amount: 50.00, type: 'Extra Item', status: 'Completed' },
      { studentRollNo: '240804', itemName: 'Ice Cream', amount: 60.00, type: 'Extra Item', status: 'Completed' }
    ]);

    await RebateRequest.bulkCreate([
      { studentRollNo: '240484', startDate: '2026-03-25', endDate: '2026-03-30', reason: 'Going home', status: 'Pending' }
    ]);

    await Feedback.bulkCreate([
      { studentRollNo: '240252', rating: 4, category: 'Food Quality', comment: 'Paneer was great.' },
      { studentRollNo: '240804', rating: 5, category: 'Service', comment: 'Very fast today.' }
    ]);

    console.log('✅ Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();