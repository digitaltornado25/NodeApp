const mongoose = require('mongoose')

let Note = new mongoose.model('Note',{
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    Note
}