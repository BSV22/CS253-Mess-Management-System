require('dotenv').config();
const sequelize = require('./src/config/db');
require('./src/models/Index');

async function checkDb() {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');
    
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllTables();
    console.log('Tables:', tables);
    
    for (const table of tables) {
        if (typeof table === 'string') {
          const columns = await queryInterface.describeTable(table);
          console.log(`\nColumns in ${table}:`);
          console.log(Object.keys(columns).join(', '));
        }
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDb();
