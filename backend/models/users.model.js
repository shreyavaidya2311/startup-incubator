const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("users", UserSchema);
