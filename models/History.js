const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  tanggal: {
    type: Date,
    default: Date.now,
  },

  hollandCode: String,

  scores: Object,

  matchingScores: Object,

  topCareer: {
    id: String,
    name: String,
    description: String,
    cluster: String,
    percentage: Number,
    code: String,
  },

  alternatives: [
    {
      id: String,
      name: String,
      percentage: Number,
    },
  ],
});

module.exports = mongoose.model("History", HistorySchema);