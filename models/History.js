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

    // Tambahkan topMatch untuk menyimpan deskripsi & persentase jurusan ke-1
    topMatch: {
        name: String,
        description: String,
        percentage: Number
    },

    // Tambahkan alternatives untuk menyimpan jurusan ke-2 dan ke-3
    alternatives: [{
        name: String,
        description: String,
        percentage: Number
    }],

    scores: Object,

    answers: Array
});

module.exports = mongoose.model("History", historySchema);