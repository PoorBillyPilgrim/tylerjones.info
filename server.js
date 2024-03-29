require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const Project = require('./models/projects');
const Note = require('./models/notes');

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

// Middleware
// images and styling
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon_io', 'favicon.ico')));

// html forms only allow GET/POST; method-override allows for PUT/DELETE
app.use(methodOverride('_method'));

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
const notesRoutes = require('./routes/notes.js');

app.get('/', async (req, res) => {
    const projects = await Project.find().sort({ createdAt: 'desc' });
    const notes = await Note.find().sort({ createdAt: 'desc' });
    res.render('index', { projects: projects, notes: notes });
});

app.get('/tyler-jones-resume.pdf', (req, res) => {
    fs.readFile('public/tyler-jones-resume.pdf', (err, data) => {
        if (err) { console.error(err) }
        else {
            res.contentType('application/pdf');
            res.send(data);
        }
    })
})

// /dashboard be called before /login 
// because passport.authenticate('local', ... ) must be called before route to which it redirects
app.use('/dashboard', dashboardRoutes);
app.use('/login', loginRoutes);
app.use('/notes', notesRoutes);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.use('*', (req, res) => {
    res.status(404).render('404');
})

app.listen(3001, () => {
    console.info('Listening on port 3001');
});