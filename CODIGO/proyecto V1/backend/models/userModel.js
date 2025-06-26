const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin", "guest"],
    default: "student"
  }
}, {
  timestamps: true
});

// 👇 Evita el error OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
