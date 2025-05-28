const { Router } = require('express');

const router = Router();

// Controllers
const { getDishes, getDishById, createDish, updateDish, deleteDish } = require('../controllers/dish.controller');

// Middlewares
const validateToken = require('../middlewares/validateToken');

// Get all dishes
router.get('/', getDishes);

// Get dish by ID
router.get('/:id', getDishById);

// Create a new dish
router.post('/', validateToken, createDish);

// Update an existing dish
router.put('/:id', validateToken, updateDish);

// Delete a dish
router.delete('/:id', validateToken, deleteDish);

module.exports = router;