const express = require('express');
const router = express.Router();
const { getMyClients, createDietPlan } = require('../controllers/nutritionistController');
const { protect, isNutritionist } = require('../middleware/authMiddleware');

// Rota para listar clientes: GET /api/nutritionist/clients
router.get('/clients', protect, isNutritionist, getMyClients);

// Rota para criar plano: POST /api/nutritionist/diet-plans
router.post('/diet-plans', protect, isNutritionist, createDietPlan);

module.exports = router;