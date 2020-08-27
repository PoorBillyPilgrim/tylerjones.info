require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// for login credentials
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error(err));
mongoose.set('useCreateIndex', true);

// express app
const app = express();

// images and styling
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon_io', 'favicon.ico')));


// authenticate and persist log-in credentials
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
        /*
        // would not connect initially
        // had to explicitly name database in order to connect
        url: process.env.MONGO_URL,
        dbName: process.env.DB_NAME
        */
    })
}));
// body-parser middleware parses incoming requests and makes data available on req.body
app.use(bodyParser.urlencoded({ extended: true }));
// must configure passport right after express-session
app.use(passport.initialize());
app.use(passport.session());

const loginCredentials = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
}

// app.locals.loginCredentials = loginCredentials;

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username === loginCredentials.username && password === loginCredentials.password) {
            return done(null, loginCredentials.username);
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((username, done) => {
    done(null, { username: username });
});

app.set('view engine', 'ejs');

// Routes
const loginRoutes = require('./routes/login.js');
// const logout = require('./routes/logout.js');
const dashboardRoutes = require('./routes/dashboard.js');

app.get('/', (req, res) => {
    res.render('index');
});

// /dashboard be called before /login 
// because passport.authenticate('local', ... ) must be called before route to which it redirects
app.use('/dashboard', dashboardRoutes);
app.use('/login', loginRoutes);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.listen(3001, () => {
    console.info('Listening on port 3001');
});