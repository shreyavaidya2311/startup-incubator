const mongoose = require("mongoose");

const InvestorSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("investors", InvestorSchema);
