const express = require('express');
const router = express.Router();
const Project = require('../models/projects');


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

router.get('/projects', async (req, res) => {
    const projects = await Project.find().sort({ order: 'asc' });
    res.render('dashboard/projects', { projects: projects });
});

router.get('/projects/new', isLoggedIn, (req, res) => {
    res.render('dashboard/projects/new');
});

router.post('/projects/new', async (req, res) => {
    req.body.techUsed = req.body.techUsed.split(',');
    project = new Project(req.body);
    console.log(project);
    project = await project.save();
    // need to use redirect in order for the projects variable to load, otherwise you get an error :(
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