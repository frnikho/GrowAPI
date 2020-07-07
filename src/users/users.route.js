const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();

const UserConfig = require('./controllers/user.controllers.js');
const AuthConfig = require('../common/middlewares/auth.middleware.js');

route.get('/', (req, res) => {
    res.json({abc: 'def'});
})

route.post('/', [AuthConfig.verifyLoginAndPassword], (req, res) => {
    UserConfig.createUser(req, res).then((result) => {
        if (result !== -1)
            res.send({id: result});
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