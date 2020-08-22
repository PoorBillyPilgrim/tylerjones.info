const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon_io', 'favicon.ico')));

app.set('view engine', 'ejs');

app.use('/', (req, res) => {
    res.render('index')
});

app.listen(3001, () => {
    console.info('Listening on port 3001');
});