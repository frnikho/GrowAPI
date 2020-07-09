const express = require('express');
const route = express.Router();

const ArticleConfig = require('./controllers/article.controllers');

route.get('/', async (req, res) => {
    await ArticleConfig.getAllArticles(req, res);
});

route.get('/:id', (req, res) => {
    console.log(req.params.id);
});

module.exports = route;