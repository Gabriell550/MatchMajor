const express = require("express");
const router = express.Router();
const Roadmap = require("../models/Roadmap");

// routes/roadmaps.js
router.get("/:hollandCode", async (req, res) => {
  try {
    const { hollandCode } = req.params;

    const roadmap = await Roadmap.findOne({ hollandCode: hollandCode.toUpperCase() });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap tidak ditemukan untuk kode ini",
      });
    }

    res.json({ success: true, data: roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

});