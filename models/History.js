const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: {
        type: String,
        default: "guest"
    },

    tanggal: {
        type: Date,
        default: Date.now
    },

    dominantStrength: String,

    recommendation: String,

    scores: Object,

    answers: Array
});

module.exports = mongoose.model("History", historySchema);