require("dotenv").config();
const sequelize = require('./src/config/db');

async function fix() {
    try {
        await sequelize.authenticate();
        console.log("DB Connected");

        console.log("Fixing Rebates table: adding amount...");
        await sequelize.query('ALTER TABLE "Rebates" ADD COLUMN IF NOT EXISTS "amount" DECIMAL(10, 2) DEFAULT 0.00');

        console.log("Fixing Students table: removing id_key, adding facePhoto...");
        await sequelize.query('ALTER TABLE "Students" DROP COLUMN IF EXISTS id_key');
        await sequelize.query('ALTER TABLE "Students" ADD COLUMN IF NOT EXISTS "facePhoto" TEXT');

        console.log("Schema Fix Successful!");
        process.exit(0);
    } catch (err) {
        console.error("Schema Fix Failed:", err);
        process.exit(1);
    }
}

fix();
