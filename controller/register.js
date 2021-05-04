const User = require('../models/users');
const { createToken } = require('../util/token');
const { hashPassword } = require('../util/password');


exports.register = (req, res) => {
    try {
        let { username, password, role } = req.body;
        
        hashPassword(password)
            .then((hash) => {
                User.create({
                    username, 
                    password: hash, 
                    role: role || "student"
                })
                .then((user) => {
                    let userToken = createToken(user._id, user.role);
                    res.status(201).send({
                        userId: user._id,
                        token: "Bearer " + userToken
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log(err);
            });       
    } 
    catch (err) {
        console.log(err);
    }
}


