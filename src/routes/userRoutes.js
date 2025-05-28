const { Router } = require('express');

const router = Router();

// Controllers
const { register, login } = require('../controllers/user.controller');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

module.exports = router;