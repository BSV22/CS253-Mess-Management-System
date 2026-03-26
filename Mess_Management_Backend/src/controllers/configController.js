// controllers/configController.js
const { Config } = require("../models/Index");

exports.getConfig = async (req, res) => {
  try {
    const { key } = req.params;
    const config = await Config.findByPk(key);
    if (!config) return res.status(404).json({ error: "Config not found" });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setConfig = async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only manager allowed" });
    }
    const { key, value } = req.body;
    const [config, created] = await Config.upsert({ key, value });
    res.json({ message: "Config updated", config });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
