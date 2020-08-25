require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// routes
const login = require('./routes/login.js')

const app = express();

const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon_io', 'favicon.ico')));

// body-parser middleware
// parses incoming requests and makes data available on req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/login', login);

app.listen(3001, () => {
    console.info('Listening on port 3001');
});