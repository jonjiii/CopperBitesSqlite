const { response, request } = require('express');
const Order = require('../models/orders');
const Dish = require('../models/dishes');
const User = require('../models/users');
const DishOrder = require('../models/dishOrder');
const e = require('express');

const getOrders = async (req = request, res = response) => {
    try {
        const orders = await Order.findAll();

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'No orders found',
            });
        }

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
    const { userId, totalPrice, dishes, quantity } = req.body;

    try {
        if (!userId || !totalPrice || !dishes || !quantity) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are required',
            });
        }

        if (typeof totalPrice !== 'number' || totalPrice <= 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Total price must be a positive number',
            });
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Quantity must be a positive number',
            });
        }
        // Validate userId
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'User not found to associate with the order',
            });
        }

        // Validating all dishes in the request
        if (!Array.isArray(dishes) || dishes.length === 0) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Dishes must be a non-empty array',
            });
        }


        // Check if each dish ID is valid, active, aviable, and exists
        for (const dishId of dishes) {
            if (typeof dishId !== 'number' || dishId <= 0) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Each dish ID must be a positive number',
                });
            } 
            
            const dishExists = await Dish.findByPk(dishId);
            
            if (!dishExists) {
                return res.status(404).json({
                    success: false,
                    error: true,
                    message: `Dish with ID ${dishId} does not exist`,
                });
            } 
            
            if (!dishExists.isActive || !dishExists.aviable) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: `Dish with ID ${dishId} is not active or available`,
                });
            }
        }

        const order = new Order({
            quantity,
            userId,
            totalPrice,
            userId
        });

        await order.save();

        // With the intermediate table 'dish_orders', associate the order with the dish. Put the id of the dish and the id of the order in the dish_orders table
        dishes.forEach(async (dishId) => {
            const dishOrder = new DishOrder({
                dishId,
                orderId: order.id
            });
            await dishOrder.save();
        });

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