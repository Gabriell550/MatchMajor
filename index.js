require('dotenv').config();

const express = require('express');
const karirData = require('./data/careers');
const questions = require('./data/questions');
const Question = require('./models/Question');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend nya udh jalan boii!');
})

//API Questions
app.get('/questions', (req, res) => {
    res.json({
        success: true,
        total: questions.length,
        data: questions
    });
});

//API Add Question
app.post('/questions', async (req, res) => {
  try {

    const newQuestion = await Question.create(req.body);

    res.json({
      success: true,
      data: newQuestion
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

//Logic Matching
function matchCareer(userScore) {
    return karirData.map(career => {
        let score = 0;

        for (let key in career.traits) {
            score += Math.abs(
                (career.traits[key] || 0) - (userScore[key] || 0)
            );
        }

        return {
            name: career.name,
            description: career.description,
            score: score
        };
    }).sort((a, b) => a.score - b.score);
}

app.post('/match', (req, res) => {
    const userScore = req.body;

    const result = matchCareer(userScore);

    res.json({
        success: true,
        topMatch: result[0],
        alternatives: result.slice(1, 3),
        message: `Karir yang paling cocok untuk kamu adalah ${result[0].name}!`
    });
});

app.listen(3000, () => {
    console.log('Server jalan di port 3000 nih!');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log(err));