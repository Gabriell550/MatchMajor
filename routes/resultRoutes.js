console.log("MATCH ROUTE LOADED");

const express = require("express");
const router = express.Router();

const Career = require("../models/Career");

async function matchCareer(userScore) {
  const careers = await Career.find();

  return careers
    .map((career) => {
      let score = 0;

      const traits = career.traits.toObject();

      for (const key of Object.keys(traits)) {
        score += Math.abs(
          Number(traits[key] || 0) - Number(userScore[key] || 0),
        );
      }

      const maxScore = 32;

      const percentage = Math.max(
        0,
        Math.round(((maxScore - score) / maxScore) * 100),
      );

      console.log("CAREER:", career.name);
      console.log("SCORE:", score);
      console.log("PERCENTAGE:", percentage);

      return {
        id: career._id,
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

    console.log(result);
    console.log(result[0]);

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
