const { response, request } = require('express');
const Order = require('../models/orders');
const Dish = require('../models/dishes');

const getOrders = async (req = request, res = response) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json({
            success: true,
            error: false,
            data: orders,
            message: 'Orders retrieved successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to retrieve orders due to server error',
        });
    }
}

const getOrderById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Order not found',
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: order,
            message: 'Order retrieved successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to retrieve order due to server error',
        });
    }
}

const createOrder = async (req = request, res = response) => {
    const { userId, totalPrice, dishId, quantity } = req.body;

    try {
        if (!userId || !totalPrice || !dishId, !quantity) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are required',
            });
        }

        const order = new Order({
            quantity,
            userId,
            totalPrice
        });

        await order.save();

        // Assuming you have a Dish model and you want to associate the order with a dish
        const dish = await Dish.findByPk(dishId);
        if (!dish) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Dish not found',
            });
        }
        await dish.update({ orderId: order.id });

        const newOrder = {
            id: order.id,
            quantity: order.quantity,
            userId: order.userId,
            totalPrice: order.totalAmount,
            status: order.status
        };

        res.status(201).json({
            success: true,
            error: false,
            data: newOrder,
            message: 'Order created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to create order due to server error',
        });
    }
}

const updateOrder = async (req = request, res = response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Order not found',
            });
        }

        if (status) {
            order.status = status;
        }

        await order.save();

        res.status(200).json({
            success: true,
            error: false,
            data: order,
            message: 'Order updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to update order due to server error',
        });
    }
}

const cancelOrder = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Order not found',
            });
        }

        order.status = 'cancelled';
        await order.save();

        res.status(200).json({
            success: true,
            error: false,
            data: order,
            message: 'Order cancelled successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to cancel order due to server error',
        });
    }
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    cancelOrder
};