const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
    cluster: {
        type: String,
        required: true
    },
    hollandCode: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    steps: [{
        step: Number,
        title: String,
        description: String,
        icon: String
    }]
}, { timestamps: true 
});

module.exports = mongoose.model("Roadmap", roadmapSchema);