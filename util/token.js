const jwt = require('jsonwebtoken');
const { jwt : { secret } } = require('../config/config.json');

exports.createToken = (userId, userRole) => {
    return jwt.sign({
        id: userId,
        role: userRole
        }, secret, {expiresIn: "1 day"});
};

