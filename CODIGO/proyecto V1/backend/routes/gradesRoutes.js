const express = require('express');
const router = express.Router();
const { getGradesByUser, createGrade, updateGrade } = require('../controllers/gradesController');
const verifyToken = require('../middleware/verifyToken');

// RF04: Visualizar calificaciones según rol
router.get('/mis-notas', verifyToken, getGradesByUser);

// RF07: Registrar nueva calificación
router.post('/registrar', verifyToken, createGrade);

// ✅ RF06: Editar calificación existente
router.put('/editar/:id', verifyToken, updateGrade);

module.exports = router;
