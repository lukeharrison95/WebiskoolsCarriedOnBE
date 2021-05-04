const User = require('../models/users');
const { createToken } = require('../util/token');
const { validatePassword } = require('../util/password');

exports.login = (req, res) => {
    try {
        let {username, password} = req.body;
        let user = User.findOne({username: username}).exec();

        user.then((response) => {
            if (validatePassword(password, response.password) == false) {
                throw new Error("password is incorrect");
            }
            token = createToken(response._id, response.role);
            res.status(200).send({
                userId: response._id,
                token: "Bearer " + token
            });
        })
        .catch((err) => {
            res.status(403).send(JSON.stringify(err, ["message"]));
            console.log(err);
        });

    }
    catch (err) {
        console.log(err);
    }
}