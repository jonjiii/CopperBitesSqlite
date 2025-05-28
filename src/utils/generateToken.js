const jwt = require('jsonwebtoken');

const generateToken = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'},
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Token generation failed');
                } else {
                    // Successfully generated token
                    console.log('Token generated successfully');
                    resolve(token);
                }
            });
    });
}

module.exports = generateToken;