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

// middlewares
const validateToken = require('../middlewares/validateToken');

// get all orders
router.get('/', validateToken,  getOrders);

// get order by id
router.get('/:id', validateToken, getOrderById);

// create a new order
router.post('/', validateToken, createOrder);

// update an existing order
router.put('/:id', validateToken, updateOrder);

// delete an order
router.delete('/:id', validateToken, cancelOrder);


module.exports = router;