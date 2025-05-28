const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const validateToken = async (req, res = response, next) => {
    const authHeader = req.header('Authorization');
    token = authHeader && authHeader.split(' ')[1];
    // If the token is not provided in the Authorization header
    if (!token) {
        return res.status(401).json({
            success: false,
            error: true,
            message: 'No token provided in the request'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(id);

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Token is invalid - user not authorized'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Token has expired'
            });
        }
        console.error(error);
        return res.status(401).json({
            success: false,
            error: true,
            message: 'Invalid token'
        });
    }
}

module.exports = validateToken;