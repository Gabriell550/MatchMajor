const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend nya udh jalan boii!');
})

//Data Karir
const karirData = [
    {
        name: "Software Engineer",
        traits: { logic: 5, creativity: 3, social: 2 }
    },
    {
        name: "UI/UX Designer",
        traits: { logic: 2, creativity: 5, social: 3 }
    },
    {
        name: "Marketing",
        traits: { logic: 2, creativity: 3, social: 5 }
    }
];

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
            score: score
        };
    }).sort((a, b) => a.score - b.score);
}

app.post('/match', (req, res) => {
    const userScore = req.body;

    const result = matchCareer(userScore);

    res.json({
        topMatch: result[0],
        alternatives: result.slice(1, 3)
    });
});

app.listen(3000, () => {
    console.log('Server jalan di port 3000 nih!');
});