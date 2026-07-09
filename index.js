require("dotenv").config();
console.log(process.env);
console.log("MONGO_URI =", process.env.MONGO_URI);

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Career = require("./models/Career");
const careerRoutes = require("./routes/careerRoutes");
const resultRoutes = require("./routes/resultRoutes");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require('./routes/adminRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/careers", careerRoutes);
app.use("/questions", questionRoutes);
app.use("/result", resultRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.send("Backend working!");
});

console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected!");

    app.listen(3000, () => {
      console.log("Server jalan di port 3000");
    });
  })
  .catch((err) => console.log(err));

