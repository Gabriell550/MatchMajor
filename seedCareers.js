const mongoose = require('mongoose');
require('dotenv').config();

const Career = require('./models/Career');
const karirData = require('./data/careers');

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    await Career.deleteMany();

    await Career.insertMany(karirData);

    console.log('Career berhasil dimasukkan');

    process.exit();

})
.catch(err => console.log(err));