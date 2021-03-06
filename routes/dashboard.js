const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const Note = require('../models/notes');

// /dashboard
router.get('/', isLoggedIn, (req, res) => {
    res.render('dashboard/index');
});

// Projects
router.get('/projects', isLoggedIn, async (req, res) => {
    const projects = await Project.find().sort({ createdAt: 'asc' });
    res.render('dashboard/projects', { projects: projects });
});

router.delete('/projects/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/projects');
});

router.get('/projects/edit/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.render('dashboard/projects/edit', { project: project });
});

router.put('/projects/edit/:id', async (req, res) => {
    project = await Project.findById(req.params.id);
    project.title = req.body.title;
    project.url = req.body.url;
    project.gitHubUrl = req.body.gitHubUrl;
    project.description = req.body.description;
    project.techUsed = req.body.techUsed;
    project.img = req.body.img;
    project = await project.save();
    res.redirect('/dashboard/projects');
});

router.get('/projects/new', isLoggedIn, (req, res) => {
    res.render('dashboard/projects/new');
});

router.post('/projects/new', async (req, res) => {
    project = new Project(req.body);
    console.log(project);
    project = await project.save();
    // need to use redirect in order for the projects variable to load, otherwise you get an error :(
    res.redirect('/dashboard/projects');
});

// Notes
router.get('/notes', isLoggedIn, async (req, res) => {
    const notes = await Note.find().sort({ createdAt: 'asc' });
    res.render('dashboard/notes', { notes: notes });
});

router.get('/notes/new', isLoggedIn, (req, res) => {
    res.render('dashboard/notes/new', { note: "" });
});

router.post('/notes/new', async (req, res) => {
    const note = await Note.findOne({ title: req.body.title })
    if (note != null) {
        res.render('dashboard/notes/new', { note: req.body });
    } else {
        newNote = new Note(req.body);
        newNote = await newNote.save();
        // need to use redirect in order for the projects variable to load, otherwise you get an error :(
        res.redirect('/dashboard/notes');
    }
});

router.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/notes');
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('dashboard/notes/edit', { note: note });
});

router.put('/notes/edit/:id', async (req, res) => {
    note = await Note.findById(req.params.id);
    note.title = req.body.title;
    note.description = req.body.description;
    note.markdown = req.body.markdown;
    note = await note.save();
    res.redirect('/dashboard/notes');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

module.exports = router;