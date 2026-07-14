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

// Fungsi mencocokkan karir
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
          Number(career.traits[key] || 0) - Number(normalizedUser[key] || 0)
        );
      }

      const percentage = Math.max(0, Math.round((1 - score / 24) * 100));

      return {
        id: career._id,
        name: career.name,
        description: career.description,
        cluster: career.cluster,
        percentage,
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

    // Skor asli asesmen
    const assessmentScores = { ...scores };

    // Skor untuk matching
    const matchingScores = tambahNilaiMapel(assessmentScores, favSubjects || []);

    // Cari jurusan
    const careers = await matchCareer(matchingScores);

    const sortedTraits = Object.entries(matchingScores).sort((a, b) => b[1] - a[1]);
    const hollandCode = sortedTraits[0][0] + sortedTraits[1][0] + sortedTraits[2][0];
    const dominan = sortedTraits[0][0]; // RIASEC trait yang paling tinggi

    if (careers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data jurusan belum tersedia",
      });
    }

    const topMatch = careers[0];
    const alternatives = careers.slice(1, 3);
    const careerObj = await Career.findById(topMatch.id);
    const roadmap = await Roadmap.findOne({
      cluster: careerObj.cluster,
      hollandCode: hollandCode,
    });

    // -------------------------------------------------------------
    // BAGIAN BARU: MENYIMPAN HASIL KE DATABASE (HISTORY)
    // -------------------------------------------------------------
    await History.create({
      userId: userId || "guest", // Jika pakai auth, ini bisa diisi UID Firebase
      dominantStrength: dominan,
      recommendation: topMatch.name,
      topMatch: {
        name: topMatch.name,
        description: topMatch.description,
        percentage: topMatch.percentage
      },
      alternatives: alternatives, // Menyimpan peringkat 2 dan 3
      scores: assessmentScores, // Menyimpan skor agar grafik menyala
      answers: req.body.answers || [] 
    });
    // -------------------------------------------------------------

    // Kembalikan respons ke frontend (assessment.html)
    res.json({
      success: true,
      topMatch: topMatch,
      alternatives: alternatives,
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
router.get("/history", async (req, res) => {
  try {
    const histories = await History.find().sort({ tanggal: -1 }); // Urutkan dari yang terbaru
    res.json(histories);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;