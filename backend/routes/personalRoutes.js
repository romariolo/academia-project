const express = require('express');
const router = express.Router();
const { getMyStudents, createWorkout } = require('../controllers/personalController.js');
const { protect, isPersonal } = require('../middleware/authMiddleware');

router.get('/students', protect, isPersonal, getMyStudents);
router.post('/workouts', protect, isPersonal, createWorkout);

module.exports = router;