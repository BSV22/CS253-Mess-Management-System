// server.js

require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");
require("./models/Index"); // Load all model associations

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");

    // Standard sync (safe)
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
};

startServer();