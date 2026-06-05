require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Career = require('./models/Career');
const careerRoutes = require('./routes/careerRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/careers', careerRoutes);

app.get('/', (req, res) => {
    res.send('Backend nya udh jalan boii!');
})


// Logic Matching
async function matchCareer(userScore) {
    const careers = await Career.find();

    return careers.map(career => {
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

app.post('/match', async (req, res) => {
    try {

        const userScore = req.body;

        const result = await matchCareer(userScore);

        res.json({
            success: true,
            topMatch: result[0],
            alternatives: result.slice(1, 3),
            message: `Karir yang paling cocok untuk kamu adalah ${result[0].name}!`
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB Connected!');

    app.listen(3000, () => {
        console.log('Server jalan di port 3000 nih!');
    });

})
.catch(err => console.log(err));