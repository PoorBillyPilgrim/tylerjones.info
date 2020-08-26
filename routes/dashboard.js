const express = require('express');
const router = express.Router();


router.get('/', isLoggedIn, (req, res) => {
    res.render('dashboard/index');
});

router.post('/', (req, res) => {
    if (req.body.projects) {
        res.redirect('/dashboard/projects');
    }
    if (req.body.notes) {
        res.render('dashboard/notes');
    }
});

router.get('/projects', (req, res) => {
    res.render('dashboard/projects');
})

router.get('/projects/new', isLoggedIn, (req, res) => {
    res.render('dashboard/projects/new');
});

router.post('/projects/new', (req, res) => {
    console.log(req.body);
    res.redirect('/dashboard/projects');
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = router;