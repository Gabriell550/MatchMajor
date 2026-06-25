const express = require('express');
const router = express.Router();

const Question = require('../models/Question');
const Career = require('../models/Career');
// const User = require('../models/User');
// const Test = require('../models/Test');

router.get('/dashboard-stats', async (req, res) => {
    try {
        const totalPertanyaan = await Question.countDocuments();
        const totalJurusan = await Career.countDocuments();
        // const totalUser = await User.countDocuments();
        // const totalTes = await Test.countDocuments();

        res.status(200).json({
            totalPertanyaan,
            totalJurusan,
            // totalUser,
            // totalTes
        });
    }catch (error) {
        console.error('Gagal memuat statistik:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
});

module.exports = router;