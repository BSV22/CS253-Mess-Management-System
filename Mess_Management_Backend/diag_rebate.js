require("dotenv").config();
const sequelize = require('./src/config/db');

async function check() {
    try {
        await sequelize.authenticate();
        console.log("DB Connected");
        const [results] = await sequelize.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'Rebates';
        `);
        console.log("Columns in Rebates table:");
        console.log(results.map(r => r.column_name));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
check();
