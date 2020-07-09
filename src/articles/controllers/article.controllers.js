const db = require('../../db.js');

exports.createArticle = (req, res) => {

};

exports.getAllArticles = async (req, res) => {
    let response = await db.query(`SELECT name, price, quota, type, primary_color, secondary_color, date, water_needed, image_url FROM ${process.env.DB_DATABASE}.articles`);
    res.send(response);
}

exports.deleteArticle = (req, res) => {

};