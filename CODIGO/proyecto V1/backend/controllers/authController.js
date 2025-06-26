const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: userFound._id }, "clave_secreta", { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        role: userFound.role,
      },
    });
  } catch {
    res.status(500).json({ message: "Error del servidor" });
  }
};

const loginAsGuest = (req, res) => {
  const guestUser = {
    name: "Invitado",
    role: "guest",
  };
  res.json({ user: guestUser });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Ya existe el usuario." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch {
    res.status(500).json({ message: "Error al registrar" });
  }
};

module.exports = { login, loginAsGuest, register };
