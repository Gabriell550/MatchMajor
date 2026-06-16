console.log("MATCH ROUTE LOADED");

const express = require("express");
const router = express.Router();

const subjectToRIASEC = require("../data/subjects");

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

      const maxScore = 3;

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

function tambahNilaiMapel(userScore, favSubject) { 
  const finalScores = { ...userScore };

  const weights = [1.5, 1.2, 1.0]

  favSubject.forEach((subject) => {
    const bonus = subjectToRIASEC[subject];

    if (!bonus) return;

    const weight = weights.shift() || 1.0;

    Object.entries(bonus).forEach(([trait, value]) => {
      finalScores[trait] = (finalScores[trait] || 0) + value * weight;
    });
  });

  return finalScore;
}

router.post("/", async (req, res) => {
  try {
    const { scores, favSubjects } = req.body;

    const finalScores = applySubjectBonus(
      scores,
      favSubjects || []
    );

    console.log("Skor awal:", scores);
    console.log("Mapel:", favSubjects);
    console.log("Skor akhir:", finalScores);

    const result = await matchCareer(finalScores);

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
      scores: finalScores
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
