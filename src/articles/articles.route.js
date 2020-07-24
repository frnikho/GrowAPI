const express = require('express');
const route = express.Router();

const ArticleConfig = require('./controllers/article.controllers');
const suggestionRoute = require('./articles.suggestion.route.js');

route.use('/suggestion', suggestionRoute);

route.get('/', async (req, res) => {
    await ArticleConfig.getAllArticles(req, res);
});

route.get('/:id', async (req, res) => {
    await ArticleConfig.getArticle(req, res, req.params.id);
});

module.exports = route;
