const db = require('../../db.js');

exports.createArticle = (req, res) => {

};

exports.getArticle = async (req, res, articleUuid) => {
    let response = await db.query(`SELECT id, name, description, price, primary_color, quota, created_at, updated_at, type, image_url, suggestion FROM ${process.env.DB_DATABASE}.articles WHERE id LIKE '${articleUuid}'`);
    res.send(response);
}

exports.getAllArticles = async (req, res) => {
    let response = await db.query(`SELECT id, name, description, price, primary_color, quota, created_at, updated_at, type, image_url, suggestion FROM ${process.env.DB_DATABASE}.articles`);
    res.send(response);
}

exports.getSuggestionArticles = async (req, res) => {
    let response = await db.query(`SELECT id, name, description, price, primary_color, quota, created_at, updated_at, type, image_url, suggestion FROM ${process.env.DB_DATABASE}.articles WHERE suggestion LIKE '1'`);
    res.send(response);
}

exports.deleteArticle = (req, res) => {

};
