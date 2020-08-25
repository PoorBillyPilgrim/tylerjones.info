const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "tyler" && password === "pw") {
        res.render('login/index');
    } else {
        res.send('Sorry, wrong credentials!')
    }
});

router.post('/index', (req, res) => {
    const projects = req.body.projects;
    const notes = req.body.notes;

    if (projects) {
        res.render('login/projects');
    }

    if (notes) {
        res.render('login/notes');
    }
});

module.exports = router;