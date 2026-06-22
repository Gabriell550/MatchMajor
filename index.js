require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Career = require("./models/Career");
const careerRoutes = require("./routes/careerRoutes");
const resultRoutes = require("./routes/resultRoutes");
const questionRoutes = require("./routes/questionRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/careers", careerRoutes);
app.use("/questions", questionRoutes);
app.use("/match", resultRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Backend working!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected!");

    app.listen(3000, () => {
      console.log("Server jalan di port 3000 nih!");
    });
  })
  .catch((err) => console.log(err));
