const mongoose = require("mongoose");
require("dotenv").config();

const Question = require("./models/Question");
const questions = require("./data/questions");

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected!");

    await Question.insertMany(questions);

    console.log(`${questions.length} questions inserted`);

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seedQuestions();
