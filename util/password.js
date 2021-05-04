const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

exports.validatePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

