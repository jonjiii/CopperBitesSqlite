const { response, request } = require('express');
const Dish = require('../models/dishes');

const getDishes = async (req = request, res = response) => {
    try {
        const dishes = await Dish.findAll();

        if (!dishes || dishes.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'No dishes found',
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            data: dishes,
            message: 'Dishes retrieved successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to retrieve dishes due to server error',
        });
    }
}

const getDishById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Dish not found',
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            data: dish,
            message: 'Dish retrieved successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to retrieve dish due to server error',
        });
    }
}

const createDish = async (req = request, res = response) => {
    const { name, description, image, price, category, ingredients } = req.body;

    try {
        if (!name || !description || !image || !price || !category || !ingredients) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are required',
            });
        }

        const dish = new Dish({
            name,
            description,
            image,
            price,
            category,
            ingredients
        });

        await dish.save();

        const newDish = {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            image: dish.image,
            price: dish.price,
            category: dish.category,
            aviable: dish.aviable,
            ingredients: dish.ingredients
        };

        res.status(201).json({
            success: true,
            error: false,
            data: newDish,
            message: 'Dish created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to create dish due to server error',
        });
    }
}

/**
 * Makes the aviable field false to make the dish unavailable
 * @param {request} the aviable field is set to false
 * @param {response} the dish is updated
 */
const updateDish = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, description, image, price, category, aviable, ingredients } = req.body;

    try {
        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Dish not found',
            });
        }

        dish.name = name || dish.name;
        dish.description = description || dish.description;
        dish.image = image || dish.image;
        dish.price = price || dish.price;
        dish.category = category || dish.category;
        dish.aviable = aviable !== undefined ? aviable : dish.aviable;
        dish.ingredients = ingredients || dish.ingredients;

        await dish.save();

        res.status(200).json({
            success: true,
            error: false,
            data: dish,
            message: 'Dish updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to update dish due to server error',
        });
    }
}

/**
 * Soft delete the dish by setting isActive to false
 * @param {} req 
 * @param {*} res 
 */
const deleteDish = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Dish not found',
            });
        }

        dish.isActive = false;
        await dish.save();

        res.status(200).json({
            success: true,
            error: false,
            data: null,
            message: 'Dish deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Failed to delete dish due to server error',
        });
    }
}

module.exports = {
    getDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};