const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "teacher", "admin", "parent", "guest"] },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
