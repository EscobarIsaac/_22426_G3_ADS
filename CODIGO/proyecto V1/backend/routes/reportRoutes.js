const express = require('express');
const router = express.Router();
const { generateGradesReport } = require('../controllers/reportController');
const verifyToken = require('../middleware/verifyToken');

router.get('/reporte', verifyToken, generateGradesReport);

module.exports = router;
