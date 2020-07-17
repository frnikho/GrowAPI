const db = require('../../db');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.verifyEmailAndPasswordField = (req, res, next) => {
    if (req.query['email'] && req.query['password']) {
        let email = req.query['email'];
        let password = req.query['password'];

        if (email.length < 5)
            return res.send({status: 400, code: "Your email must be higher than 5 character"});
        if (password.length < 5)
            return res.send({status: 400, code: "Your password must be higher than 5 character"});
        return next();
    }
    return res.send({status: 400, code: "Missing email or password post params !"});
};

exports.checkIfEmailAndPasswordMatch = async (req, res, next) => {
    let email = req.query['email'];
    let password = req.query['password'];

    let user_hash_password_db = await db.query(`SELECT password FROM ${process.env.DB_DATABASE}.users WHERE email LIKE BINARY '${email}'`).then((rows) => {
        if (rows[0] == null || rows[0] === 'undefined')
            return (-1);
        return rows[0].password;
    });
    if (user_hash_password_db === -1)
        return res.send({error: 'User not found !'});
    let correctPassword = bcrypt.compareSync(password, user_hash_password_db);
    if (!correctPassword)
        return res.send({error: 'Bad password !'});
    return next();
}

exports.requireId = (req, res, next) => {
    if (req.body['id']) {
        next();
    } else {
        return res.send({status: 400, code: "Require user id"});
    }
};