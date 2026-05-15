const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    trait: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Personality'
    }
})

module.exports = mongoose.model('Question', questionSchema);