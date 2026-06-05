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

    traits: {
        logic: Number,
        creativity: Number,
        social: Number,
        analytical: Number,
        leadership: Number,
        practical: Number,
        empathy: Number,
        curiosity: Number
    }
});

module.exports = mongoose.model('Career', careerSchema);