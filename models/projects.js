const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String
    },
    gitHubUrl: {
        type: String
    },
    description: {
        type: String
    },
    techUsed: {
        type: String
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model('project', ProjectSchema);