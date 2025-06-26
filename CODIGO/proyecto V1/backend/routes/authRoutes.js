const express = require("express");
const router = express.Router();
const {
  login,
  register,
  loginAsGuest
} = require("../controllers/authController");

// Ruta de login
router.post("/login", login);

// Ruta para registro
router.post("/register", register);

// Ruta para entrar como invitado
router.get("/guest", loginAsGuest);

module.exports = router;
