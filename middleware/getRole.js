const jwtDecode = require('jwt-decode');

exports.getRole = (req, res, next) => {
    let token  = req.headers.authorization;
    res.locals.payload = jwtDecode(token);
    next();
};

