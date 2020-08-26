const express = require('express');
const router = express.Router();


router.get('/', isLoggedIn, (req, res) => {
    res.render('dashboard/index');
});

router.post('/', (req, res) => {

    if (req.body.projects) {
        res.render('dashboard/projects');
    }
    if (req.body.notes) {
        res.render('dashboard/notes');
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = router;