const moongoose = require('mongoose');

const ProjectSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
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

module.exports = mongoose.model('Project', ProjectSchema);