const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const generateToken = require('../utils/generateToken');

const register = async (req = request, res = response) => {
    const { name, lastname, email, password } = req.body;

    try {
        // Validate required fields
        if (!name || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'All fields are required'
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalid operation cannot register user'
            });
        }

        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password, salt);

        // Create a new user
        const user = new User({
            name,
            lastname,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate a token for the new user
        const token = await generateToken(user.id);

        const userData = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token
        }

        res.status(201).json({
            success: true,
            error: false,
            data: userData,
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Registration failed due to server error',
        });
    }
}

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalid credentials'
            });
        }

        // Verify the password
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Invalid credentials'
            });
        }

        // Generate a token for the user
        const token = await generateToken(user.id);

        const userData = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token
        }

        res.status(200).json({
            success: true,
            error: false,
            data: userData,
            message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Login failed due to server error',
        });
    }
}

const getUser = async (req = request, res = response) => {}

const updateUser = async (req = request, res = response) => {}

const deleteUser = async (req = request, res = response) => {}

const getAllUsers = async (req = request, res = response) => {}

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers
};
