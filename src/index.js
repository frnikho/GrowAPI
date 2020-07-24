const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./users/users.route.js');
const authRoute = require('./auth.route.js');
const articleRoute = require('./articles/articles.route.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/articles', articleRoute);

app.use(express.static('public'));

app.listen(3030, () => {
   console.log("server open at localhost:3030");
});
