const express = require("express");
const router = express.Router();

const Career = require("../models/Career");

async function matchCareer(userScore) {
  const careers = await Career.find();

  return careers
    .map((career) => {
      let score = 0;

      for (let key in career.traits) {
        score += Math.abs((career.traits[key] || 0) - (userScore[key] || 0));
      }

      const maxScore = 32;

      const percentage = Math.round(((maxScore - score) / maxScore) * 100);

      return {
        name: career.name,
        description: career.description,
        score,
        percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
}

router.post("/", async (req, res) => {
  try {
    const result = await matchCareer(req.body);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data karir belum tersedia",
      });
    }

    res.json({
      success: true,
      topMatch: result[0],
      alternatives: result.slice(1, 3),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
