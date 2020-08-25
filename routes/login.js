const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "tyler" && password === "pw") {
        res.send("successful login!")
    } else {
        res.send('Sorry, wrong credentials!')
    }
})

module.exports = router;