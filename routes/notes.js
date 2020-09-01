const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

router.get('/:slug', async (req, res) => {
    const note = await Note.findOne({ slug: req.params.slug });
    if (note == null) {
        res.redirect('/');
    } else {
        res.render('note.ejs', { note: note });
    }
});

module.exports = router;