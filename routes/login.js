const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        // redirect route must be set before passport.authenticate('local', ... ) is called
        res.redirect('dashboard');
    }
);

module.exports = router;