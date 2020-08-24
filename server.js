require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');

const app = express();

const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon_io', 'favicon.ico')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    console.log('went to login page');
    res.render('login.ejs');
});

app.listen(3001, () => {
    console.info('Listening on port 3001');
});