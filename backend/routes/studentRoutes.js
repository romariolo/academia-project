const express = require('express');
const router = express.Router();
const { createMeasurement } = require('../controllers/studentController.js');
const { protect, isStudent } = require('../middleware/authMiddleware');

// Futuramente, a rota para o aluno ver o treino dele virá aqui
// router.get('/workouts', protect, isStudent, getMyWorkouts);

router.post('/measurements', protect, isStudent, createMeasurement);

module.exports = router;