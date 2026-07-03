console.log("MATCH ROUTE LOADED");

const express = require("express");
const router = express.Router();

const subjectToRIASEC = require("../data/subjects");
const Career = require("../models/Career");
const History = require("../models/History");

// =========================
// Fungsi mencocokkan karir
// =========================
async function matchCareer(userScore) {
  const careers = await Career.find();

  const normalizedUser = {
    R: userScore.R / 5,
    I: userScore.I / 5,
    A: userScore.A / 5,
    S: userScore.S / 5,
    E: userScore.E / 5,
    C: userScore.C / 5,
  };

  return careers
    .map((career) => {
      let score = 0;

      for (const key of Object.keys(career.traits)) {
        score += Math.abs(
          Number(career.traits[key] || 0) -
          Number(normalizedUser[key] || 0)
        );
      }

      const percentage = Math.max(
        0,
        Math.round((1 - score / 24) * 100)
      );

      return {
        id: career._id,
        name: career.name,
        description: career.description,
        percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
}

// =========================
// Tambah nilai mapel favorit
// =========================
function tambahNilaiMapel(userScore, favSubjects = []) {
  const finalScores = { ...userScore };

  const weights = [1.5, 1.2, 1];

  favSubjects.forEach((subject, index) => {
    const bonus = subjectToRIASEC[subject];

    if (!bonus) return;

    const weight = weights[index] || 1;

    Object.entries(bonus).forEach(([trait, value]) => {
      finalScores[trait] =
        (finalScores[trait] || 0) + value * weight;
    });
  });

  return finalScores;
}

// =========================
// POST HASIL ASESMEN
// =========================
router.post("/", async (req, res) => {
  try {
    const { scores, favSubjects, answers } = req.body;

    if (!scores) {
      return res.status(400).json({
        success: false,
        message: "Scores tidak ditemukan",
      });
    }

    const finalScores = tambahNilaiMapel(
      scores,
      favSubjects || []
    );

    const result = await matchCareer(finalScores);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data karir belum tersedia",
      });
    }

    const topCareer = result[0];

    // Cari skor RIASEC terbesar
    const dominantStrength = Object.keys(finalScores).reduce((a, b) =>
      finalScores[a] > finalScores[b] ? a : b
    );

    // Simpan ke database
    const history = new History({
      userId: "guest",
      tanggal: new Date(),
      dominantStrength,
      recommendation: topCareer.name,
      scores: finalScores,
      answers: answers || [],
    });

  console.log("POST /match dipanggil");
  console.log(req.body);

    await history.save();
    console.log("History berhasil disimpan");

    res.json({
      success: true,
      topMatch: topCareer,
      alternatives: result.slice(1, 3),
      scores: finalScores,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// GET RIWAYAT
// =========================
router.get("/history", async (req, res) => {
  try {
    const histories = await History.find().sort({
      tanggal: -1,
    });

    res.json(histories);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;