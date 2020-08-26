const moongoose = require('mongoose');

const NoteSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true
    },
})