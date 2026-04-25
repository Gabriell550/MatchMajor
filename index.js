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
        description: "Software Engineer cocok buat kamu yang suka ngoding dan problem solving, karena kamu bakal merancang, membangun, dan mengembangkan aplikasi atau sistem dengan solusi yang efektif dan efisien.",
        traits: { logic: 5, creativity: 3, social: 2 }
    },
    {
        name: "UI/UX Designer",
        description: "UI/UX Designer cocok buat kamu yang memiliki kreativitas tinggi dan perhatian terhadap detail, karena kamu bakal merancang antarmuka yang menarik dan mudah digunakan.",
        traits: { logic: 2, creativity: 5, social: 3 }
    },
    {
        name: "Marketing",
        description: "Marketing cocok buat kamu yang punya kemampuan komunikasi yang baik dan suka bekerja dengan orang, karena kamu bakal merancang strategi pemasaran untuk mempromosikan produk atau layanan.",
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