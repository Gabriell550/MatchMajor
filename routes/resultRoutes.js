console.log("MATCH ROUTE LOADED");

const express = require("express");
const router = express.Router();

const Career = require("../models/Career");
const subjectToRIASEC = require("../data/subjects");
const Roadmap = require("../models/Roadmap");
const History = require("../models/History"); // Memanggil model History di bagian atas

// Fungsi Tambah bonus mapel
function tambahNilaiMapel(userScore, favSubjects = []) {
  const finalScores = { ...userScore };
  const weights = [1.5, 1.2, 1.0];

  favSubjects.forEach((subject, index) => {
    const bonus = subjectToRIASEC[subject];
    if (!bonus) return;

    const weight = weights[index] || 1;

    Object.entries(bonus).forEach(([trait, value]) => {
      finalScores[trait] = (finalScores[trait] || 0) + value * weight;
    });
  });

  return finalScores;
}

// Matching jurusan

// Fungsi mencocokkan karir
// Fungsi mencocokkan karir
async function matchCareer(userScore) {
  const careers = await Career.find();

  // Normalisasi skor user ke skala 1–5
  const maxScore = Math.max(...Object.values(userScore), 1);

  const normalizedUser = {};

  Object.keys(userScore).forEach((key) => {
    normalizedUser[key] = (userScore[key] / maxScore) * 5;
  });

  const TRAITS = ["R", "I", "A", "S", "E", "C"];

  return careers
    .map((career) => {
      let distance = 0;

      TRAITS.forEach((trait) => {
        distance += Math.abs(
          (normalizedUser[trait] || 0) - (career.traits[trait] || 0),
        );
      });

      // Maksimum selisih = 6 trait × 4 poin = 24
      const percentage = Math.round(((24 - distance) / 24) * 100);

      return {
        id: career._id,
        name: career.name,
        description: career.description,
        cluster: career.cluster,
        code: career.code,
        percentage: Math.max(0, Math.min(100, percentage)),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);
}

// ==========================================
// API POST / - Hitung dan Simpan Hasil Asesmen
// ==========================================
router.post("/", async (req, res) => {
  try {
    const { scores, favSubjects, userId } = req.body;

    if (!scores) {
      return res.status(400).json({
        success: false,
        message: "Scores tidak ditemukan",
      });
    }

    const assessmentScores = { ...scores };
    const matchingScores = tambahNilaiMapel(
      assessmentScores,
      favSubjects || [],
    );
    const careers = await matchCareer(matchingScores);

    const sortedTraits = Object.entries(matchingScores).sort(
      (a, b) => b[1] - a[1],
    );
    const hollandCode = sortedTraits[0][0] + sortedTraits[1][0];

    if (careers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data jurusan belum tersedia",
      });
    }

    const code1 = hollandCode;
    const code2 = hollandCode.split("").reverse().join("");

    let roadmap = await Roadmap.findOne({
      career: careers[0].name,
    });

    if (!roadmap) {
      console.log(`Roadmap ${careers[0].name} belum tersedia`);
    }

    await History.create({
      userId,
      tanggal: new Date(),
      hollandCode,
      scores: assessmentScores,
      matchingScores,
      topCareer: careers[0],
      alternatives: careers.slice(1, 3),
      roadmap: roadmap || null,
    });

    res.json({
      success: true,
      topMatch: careers[0],
      alternatives: careers.slice(1, 3),
      scores: assessmentScores,
      hollandCode: hollandCode,
      roadmap: roadmap || null,
      matchingScores: matchingScores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// API GET /history - Ambil Riwayat Asesmen
// ==========================================
router.get("/history/:userId", async (req,res)=>{

    const histories = await History.find({
        userId:req.params.userId
    }).sort({
        tanggal:-1
    });

    res.json(histories);

});

module.exports = router;
