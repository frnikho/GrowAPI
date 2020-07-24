const express = require('express');
const route = express.Router();

const ArticleConfig = require('./controllers/article.controllers');

route.get('/', async (req, res) => {
    await ArticleConfig.getSuggestionArticles(req, res);
});

module.exports = route;
