const mongoose = require("mongoose");

const StartupSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("startups", StartupSchema);
