const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    cluster: {
        type: String,
        required: true
    },

    traits: {
        R: Number,
        I: Number,
        A: Number,
        S: Number,
        E: Number,
        C: Number
    }
});

module.exports = mongoose.model('Career', careerSchema);