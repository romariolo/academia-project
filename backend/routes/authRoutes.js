const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload, authController.register);
router.post('/login', authController.login);

module.exports = router;