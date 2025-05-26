const { Router } = require('express');

const router = Router();

// Controllers
const { getDishes, getDishById, createDish, updateDish, deleteDish } = require('../controllers/dish.controller');

// Get all dishes
router.get('/', getDishes);

// Get dish by ID
router.get('/:id', getDishById);

// Create a new dish
router.post('/', createDish);

// Update an existing dish
router.put('/:id', updateDish);

// Delete a dish
router.delete('/:id', deleteDish);

module.exports = router;