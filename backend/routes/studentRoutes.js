const express = require('express');
const router = express.Router();
const { createMeasurement } = require('../controllers/studentController.js');
const { protect, isStudent } = require('../middleware/authMiddleware');

// Rota para salvar medidas: POST /api/student/measurements
router.post('/measurements', protect, isStudent, createMeasurement);

// Futuramente, podemos adicionar outras rotas específicas do aluno aqui
// Ex: router.get('/my-plan', protect, isStudent, getMyPlan);

module.exports = router;