// API Careers
const express = require("express");
const router = express.Router();
const Career = require("../models/Career");

router.post("/", async (req, res) => {
  try {
    const careers = await Career.find();

    console.log("DATA PERTAMA:");
    console.log(JSON.stringify(careers[0], null, 2));

    res.json({
      success: true,
      data: newCareer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// API Get Careers
router.get("/", async (req, res) => {
  try {
    const careers = await Career.find();

    res.json({
      success: true,
      total: careers.length,
      data: careers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//API Put Career
router.put("/:id", async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json({
      success: true,
      data: updatedCareer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//API Delete Career
router.delete("/:id", async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Career berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
