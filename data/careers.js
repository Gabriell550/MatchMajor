const karirData = [
    {
        name: "Software Engineer",
        description: "Software Engineer cocok buat kamu yang suka ngoding dan problem solving, karena kamu bakal merancang, membangun, dan mengembangkan aplikasi atau sistem dengan solusi yang efektif dan efisien.",
        traits: { logic: 5, creativity: 3, social: 2, analytical: 4, leadership: 2, practical: 4, empathy: 2, curiosity: 4 }
    },
    {
        name: "UI/UX Designer",
        description: "UI/UX Designer cocok buat kamu yang memiliki kreativitas tinggi dan perhatian terhadap detail, karena kamu bakal merancang antarmuka yang menarik dan mudah digunakan.",
        traits: { logic: 2, creativity: 5, social: 3, analytical: 3, leadership: 2, practical: 4, empathy: 4, curiosity: 3 }
    },
    {
        name: "Marketing",
        description: "Marketing cocok buat kamu yang punya kemampuan komunikasi yang baik dan suka bekerja dengan orang, karena kamu bakal merancang strategi pemasaran untuk mempromosikan produk atau layanan.",
        traits: { logic: 2, creativity: 5, social: 5, analytical: 3, leadership: 3, practical: 3, empathy: 3, curiosity: 4 }
    },
    {
        name: "Ilmu Komunikasi",
        description: "Ilmu Komunikasi cocok buat kamu yang suka berinteraksi dengan orang dan memiliki kemampuan komunikasi yang baik, karena kamu bakal mempelajari berbagai aspek komunikasi, seperti media, hubungan masyarakat, dan komunikasi organisasi.",
        traits: { logic: 3, creativity: 4, social: 5, analytical: 2, leadership: 2, practical: 2, empathy: 5, curiosity: 3 }
    },
    {
        name: "Hukum",
        description: "Hukum cocok buat kamu yang suka berpikir kritis dan memiliki kemampuan analitis yang baik, karena kamu bakal mempelajari sistem hukum, peraturan, dan bagaimana menerapkannya dalam berbagai situasi.",
        traits: { logic: 5, creativity: 2, social: 3, analytical: 4, leadership: 4, practical: 3, empathy: 4, curiosity: 4 }
    },
    {
        name: "Psikologi",
        description: "Psikologi cocok buat kamu yang tertarik dengan perilaku manusia dan memiliki empati yang tinggi, karena kamu bakal mempelajari berbagai aspek psikologi, seperti psikologi klinis, psikologi sosial, dan psikologi perkembangan.",
        traits: {logic: 3, creativity: 4, social: 5, analytical: 4, leadership: 2, practical: 2, empathy: 5, curiosity: 4 }
    },
    {
        name: "Agribisnis",
        description: "Agribisnis cocok buat kamu yang tertarik dengan pertanian dan bisnis, karena kamu bakal mempelajari berbagai aspek agribisnis, seperti manajemen pertanian, pemasaran produk pertanian, dan teknologi pertanian.",
        traits: { logic: 4, creativity: 3, social: 3, analytical: 2, leadership: 2, practical: 4, empathy: 4, curiosity: 2 }
    },
    {
        name : "Ilmu Politik",
        description: "Ilmu Politik cocok buat kamu yang tertarik dengan sistem politik dan pemerintahan, karena kamu bakal mempelajari berbagai aspek ilmu politik, seperti teori politik, hubungan internasional, dan kebijakan publik.",
        traits: { logic: 4, creativity: 3, social: 4, analytical: 3, leadership: 2, practical: 4, empathy: 4, curiosity: 3 }
    },
    {
        name: "Ilmu Kelautan",
        description: "Ilmu Kelautan cocok buat kamu yang tertarik dengan laut dan lingkungan, karena kamu bakal mempelajari berbagai aspek ilmu kelautan, seperti ekologi laut, geologi kelautan, dan teknologi kelautan.",
        traits: { logic: 4, creativity: 3, social: 2, analytical: 3, leadership: 2, practical: 4, empathy: 4, curiosity: 3 }
    },
    {
        name: "Akuntansi",
        description: "Akuntansi cocok buat kamu yang suka dengan angka dan detail, karena kamu bakal mempelajari berbagai aspek akuntansi, seperti akuntansi keuangan, akuntansi manajemen, dan audit.",
        traits: { logic: 5, creativity: 2, social: 3, analytical: 4, leadership: 2, practical: 4, empathy: 2, curiosity: 4 }
    },
    {
        name: "Kedokteran",
        description: "Kedokteran cocok buat kamu yang tertarik dengan ilmu kesehatan dan memiliki empati yang tinggi, karena kamu bakal mempelajari berbagai aspek kedokteran, seperti anatomi, fisiologi, dan praktik klinis.",
        traits: { logic: 5, creativity: 2, social: 4, analytical: 5, leadership: 3, practical: 5, empathy: 4, curiosity: 4 }
    },
    {
        name: "Hubungan Internasional",
        description: "Hubungan Internasional cocok buat kamu yang tertarik dengan politik global dan memiliki kemampuan komunikasi yang baik, karena kamu bakal mempelajari berbagai aspek hubungan internasional, seperti diplomasi, keamanan global, dan ekonomi internasional.",
        traits: { logic: 4, creativity: 3, social: 5, analytical: 3, leadership: 2, practical: 4, empathy: 4, curiosity: 3 }
    },
    {
        name: "Pendidikan Matematika",
        description: "Pendidikan Matematika cocok buat kamu yang suka dengan matematika dan memiliki kemampuan mengajar, karena kamu bakal mempelajari berbagai aspek pendidikan matematika, seperti metode pengajaran, kurikulum, dan psikologi belajar.",
        traits: { logic: 5, creativity: 2, social: 3, analytical: 4, leadership: 2, practical: 4, empathy: 3, curiosity: 4 }
    },
    {
        name: "Pendidikan Bahasa Inggris",
        description: "Pendidikan Bahasa Inggris cocok buat kamu yang suka dengan bahasa Inggris dan memiliki kemampuan mengajar, karena kamu bakal mempelajari berbagai aspek pendidikan bahasa Inggris, seperti metode pengajaran, kurikulum, dan psikologi belajar.",
        traits: { logic: 3, creativity: 3, social: 4, analytical: 3, leadership: 2, practical: 4, empathy: 4, curiosity: 3 }
    },
    {
        name: "Teknik Mesin",
        description: "Teknik Mesin cocok buat kamu yang memiliki rasa ingin tahu tinggi tentang cara kerja alat, menyukai matematika dan fisika, serta tertarik pada perancangan, manufaktur, dan pengoperasian mesin.",
        traits: { logic: 5, creativity: 2, social: 2, analytical: 5, leadership: 2, practical: 5, empathy: 1, curiosity: 4 }
    },
    {
        name: "Teknik Elektro",
        description: "Teknik Elektro cocok buat kamu yang suka dengan teknologi dan memiliki kemampuan problem solving, karena kamu bakal mempelajari berbagai aspek teknik elektro, seperti desain, manufaktur, dan pemeliharaan sistem listrik.",
        traits: { logic: 4, creativity: 3, social: 2, analytical: 3, leadership: 2, practical: 3, empathy: 1, curiosity: 5 }
    },
    {
        name: "Teknik Sipil",
        description: "Teknik Sipil cocok buat kamu yang logis, teliti, menyukai fisika dan matematika, serta tertarik pada pembangunan infrastruktur.",
        traits: { logic: 4, creativity: 4, social: 2, analytical: 5, leadership: 2, practical: 5, empathy: 1, curiosity: 4 }
    },
    {
        name: "Keperawatan",
        description: "Keperawatan cocok buat kamu yang memiliki empati tinggi, suka membantu orang lain, dan tertarik pada bidang kesehatan, karena kamu bakal mempelajari berbagai aspek keperawatan, seperti perawatan pasien, manajemen keperawatan, dan kesehatan masyarakat.",
        traits: { logic: 3, creativity: 2, social: 5, analytical: 2, leadership: 2, practical: 5, empathy: 5, curiosity: 3 }
    },
    {
        name: "Kesehatan Masyarakat",
        description: "Kesehatan Masyarakat cocok buat kamu yang tertarik dengan kesehatan masyarakat dan memiliki kemampuan analitis yang baik, karena kamu bakal mempelajari berbagai aspek kesehatan masyarakat, seperti epidemiologi, promosi kesehatan, dan kebijakan kesehatan.",
        traits: { logic: 3, creativity: 3, social: 4, analytical: 4, leadership: 2, practical: 4, empathy: 4, curiosity: 3 }
    }
];

module.exports = karirData;