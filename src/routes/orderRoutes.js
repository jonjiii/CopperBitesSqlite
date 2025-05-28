const { Router } = require('express');

const router = Router();

// controllers
const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    cancelOrder
} = require('../controllers/order.controller');

// get all orders
router.get('/', getOrders);

// get order by id
router.get('/:id', getOrderById);

// create a new order
router.post('/', createOrder);

// update an existing order
router.put('/:id', updateOrder);

// delete an order
router.delete('/:id', cancelOrder);


module.exports = router;