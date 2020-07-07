const db = require('../../db');
const crypto = require('crypto');
const uniqid = require('uniqid');
const uuid = require('uuid');

exports.createUser = async (req, res) => {
    let login = req.body['login'];
    let password = req.body['password'];

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(password)
        .digest("base64");
    password = salt + "$" + hash;
    let id = uniqid();
    let user_id = await db.query(`INSERT INTO ${process.env.DB_DATABASE}.users (id, username, password) VALUES ('${id}', '${login}', '${password}');`).then((rows) => {
        return (id);
    }).catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
            res.send({status: 400, code: "Username already exists !"});
            return (-1);
        }
    });
    (await db.getConnection()).release();
    return (user_id);
}

exports.deleteUser = async (req, res) => {
    let id = req.body['id'];
    let result = await db.query(`DELETE FROM ${process.env.DB_DATABASE}.users WHERE id LIKE '${id}' ESCAPE '#'`).then(result => {
        return (1);
    }).catch(err => {
        return (-1);
    });
    return (result);
}