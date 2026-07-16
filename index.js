require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const Career = require('./models/Career');
const careerRoutes = require('./routes/careerRoutes');
const resultRoutes = require('./routes/resultRoutes');
const questionRoutes = require('./routes/questionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

require('./config/passport')(passport);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/careers', careerRoutes);
app.use('/questions', questionRoutes);
app.use('/result', resultRoutes);
app.use('/api/admin', adminRoutes);
app.use('/', authRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get(/^\/.*\.html$/, (req, res) => {
  const filePath = path.join(__dirname, 'public', req.path.replace(/^\//, ''));
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('File tidak ditemukan');
  });
});

app.get('/', (req, res) => {
  res.send('Backend working!');
});

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server jalan di port', process.env.PORT || 3000);
    });
  })
  .catch((err) => console.log(err));