const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        unique: true
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
        type: [String]
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model('project', ProjectSchema);