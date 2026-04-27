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
        traits: { logic: 5, creativity: 3, social: 2, analitycal: 4, leadership: 2, practical: 4, emphaty: 2, curiosity: 4 }
    },
    {
        name: "UI/UX Designer",
        description: "UI/UX Designer cocok buat kamu yang memiliki kreativitas tinggi dan perhatian terhadap detail, karena kamu bakal merancang antarmuka yang menarik dan mudah digunakan.",
        traits: { logic: 2, creativity: 5, social: 3, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
    },
    {
        name: "Marketing",
        description: "Marketing cocok buat kamu yang punya kemampuan komunikasi yang baik dan suka bekerja dengan orang, karena kamu bakal merancang strategi pemasaran untuk mempromosikan produk atau layanan.",
        traits: { logic: 2, creativity: 3, social: 5, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
    },
    {
        name: "Ilmu Komunikasi",
        description: "Ilmu Komunikasi cocok buat kamu yang suka berinteraksi dengan orang dan memiliki kemampuan komunikasi yang baik, karena kamu bakal mempelajari berbagai aspek komunikasi, seperti media, hubungan masyarakat, dan komunikasi organisasi.",
        traits: { logic: 3, creativity: 3, social: 5, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
    },
    {
        name: "Hukum",
        description: "Hukum cocok buat kamu yang suka berpikir kritis dan memiliki kemampuan analitis yang baik, karena kamu bakal mempelajari sistem hukum, peraturan, dan bagaimana menerapkannya dalam berbagai situasi.",
        traits: { logic: 5, creativity: 2, social: 3, analitycal: 4, leadership: 4, practical: 3, emphaty: 4, curiosity: 4 }
    },
    {
        name: "Psikologi",
        description: "Psikologi cocok buat kamu yang tertarik dengan perilaku manusia dan memiliki empati yang tinggi, karena kamu bakal mempelajari berbagai aspek psikologi, seperti psikologi klinis, psikologi sosial, dan psikologi perkembangan.",
        traits: {logic: 3, creativity: 3, social: 5, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
    },
    {
        name: "Agribisnis",
        description: "Agribisnis cocok buat kamu yang tertarik dengan pertanian dan bisnis, karena kamu bakal mempelajari berbagai aspek agribisnis, seperti manajemen pertanian, pemasaran produk pertanian, dan teknologi pertanian.",
        traits: { logic: 4, creativity: 3, social: 3, analitycal: 2, leadership: 2, practical: 4, emphaty: 4, curiosity: 2 }
    },
    {
        name : "Ilmu Politik",
        description: "Ilmu Politik cocok buat kamu yang tertarik dengan sistem politik dan pemerintahan, karena kamu bakal mempelajari berbagai aspek ilmu politik, seperti teori politik, hubungan internasional, dan kebijakan publik.",
        traits: { logic: 4, creativity: 3, social: 4, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
    },
    {
        name: "Ilmu Kelautan",
        description: "Ilmu Kelautan cocok buat kamu yang tertarik dengan laut dan lingkungan, karena kamu bakal mempelajari berbagai aspek ilmu kelautan, seperti ekologi laut, geologi kelautan, dan teknologi kelautan.",
        traits: { logic: 4, creativity: 3, social: 2, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
    },
    {
        name: "Akuntansi",
        description: "Akuntansi cocok buat kamu yang suka dengan angka dan detail, karena kamu bakal mempelajari berbagai aspek akuntansi, seperti akuntansi keuangan, akuntansi manajemen, dan audit.",
        traits: { logic: 5, creativity: 2, social: 3, analitycal: 4, leadership: 2, practical: 4, emphaty: 2, curiosity: 4 }
    },
    {
        name: "Kedokteran",
        description: "Kedokteran cocok buat kamu yang tertarik dengan ilmu kesehatan dan memiliki empati yang tinggi, karena kamu bakal mempelajari berbagai aspek kedokteran, seperti anatomi, fisiologi, dan praktik klinis.",
        traits: { logic: 4, creativity: 3, social: 5, analitycal: 3, leadership: 2, practical: 4, emphaty: 4, curiosity: 3 }
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