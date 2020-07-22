const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();

const UserConfig = require('./controllers/user.controllers.js');
const AuthConfig = require('../common/middlewares/auth.middleware.js');

route.get('/', [AuthConfig.verifyEmailAndPasswordField, AuthConfig.checkIfEmailAndPasswordMatch], (req, res) => {
    UserConfig.getUser(req, res).then((result) => {
        if (result === -1)
            return res.send({code: 421, error: "An error occurred, please try again later"})
        return res.send(result);
    });
})

route.post('/', [AuthConfig.verifyEmailAndPasswordField], (req, res) => {
    UserConfig.createUser(req, res).then((result) => {
        if (result !== -1) {
            res.send({code: 200, message: "user created !", id: result});
        } else {
            res.send
        }
    }).catch((error) => {
        console.log(error);
    });
});

route.delete('/', [AuthConfig.requireId], (req, res) => {
    UserConfig.deleteUser(req, res).then(result => {
        if (result === -1) {
            res.json({status: 300, code: "Error with database"})
        } else {
            res.json({status: 200, code: "Deleted "});
        }
    });
});

module.exports = route;
