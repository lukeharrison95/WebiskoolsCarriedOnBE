const { roles } = require('../roles');

exports.validateRole = (userRole) => {
    if (roles.includes(userRole) == false) {
        throw new Error("role not defined");
    }
    return userRole;
}