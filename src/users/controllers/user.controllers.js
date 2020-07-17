const db = require('../../db');
const crypto = require('crypto');
const uniqid = require('uniqid');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.createUser = async (req, res) => {
    let email = req.body['email'];
    let password = req.body['password'];
    let id = uniqid();
    password = bcrypt.hashSync(password, saltRounds);

    let user_id = await db.query(`INSERT INTO ${process.env.DB_DATABASE}.users (id, email, password) VALUES ('${id}', '${email}', '${password}');`).then((rows) => {
        return (id);
    }).catch((error) => {
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.send({status: 400, code: "Username already exists !"});
            return (-1);
        }
    });
    return (user_id);
}

exports.getUser = async (req, res) => {
    let email = req.query['email'];

    let rt = await db.query(`SELECT id, email, firstname, lastname, date, phone FROM ${process.env.DB_DATABASE}.users WHERE email LIKE BINARY '${email}'`).then((rows) => {
        if (rows[0] == null || rows[0] === 'undefined') {
            console.log('null');
            return (-1);
        }
        return (rows[0]);
    });
    return (rt);
}

exports.deleteUser = async (req, res) => {
    let id = req.body['id'];
    let result = await db.query(`DELETE FROM ${process.env.DB_DATABASE}.users WHERE id LIKE '${id}' ESCAPE '#'`).then(result => {
        return (1);
    }).catch((err) => {
        return (-1);
    });
    return (result);
}