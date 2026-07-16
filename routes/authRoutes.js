const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

async function ensureAdminSeed() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@matchmajor.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const existingAdmin = await User.findOne({ email: adminEmail, role: 'admin' });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: 'Admin MatchMajor',
      email: adminEmail,
      username: 'admin',
      password: hashed,
      role: 'admin'
    });
    console.log(`Akun admin dibuat: ${adminEmail}`);
  }
}

ensureAdminSeed().catch(err => console.error('Seeder admin gagal:', err));

router.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send('Semua field harus diisi.');
    }
    if (password !== confirmPassword) {
      return res.status(400).send('Password dan konfirmasi tidak cocok.');
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username: normalizedEmail }] });
    if (existingUser) {
      return res.status(400).send('Email atau username sudah terdaftar.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email: normalizedEmail,
      username: normalizedEmail,
      password: hashedPassword,
      role: 'user'
    });

    return res.redirect('/login.html');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Terjadi kesalahan server.');
  }
});

router.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).send('Username/email dan password wajib diisi.');
    }

    const search = identifier.toLowerCase();
    const user = await User.findOne({
      $or: [{ email: search }, { username: search }]
    });

    if (!user || !user.password) {
      return res.status(401).send('Akun tidak ditemukan atau tidak dapat login dengan password.');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send('Password salah.');
    }

    req.login(user, err => {
      if (err) return res.status(500).send('Gagal membuat sesi.');
      if (user.role === 'admin') {
        return res.redirect('/Admin.html');
      }
      return res.redirect('/index.html');
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Terjadi kesalahan server.');
  }
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  (req, res) => {
    if (req.user.role === 'admin') {
      return res.redirect('/Admin.html');
    }
    return res.redirect('/index.html');
  });

router.get('/auth/logout', (req, res) => {
  req.logout(err => {
    if (err) console.error(err);
    res.redirect('/login.html');
  });
});

module.exports = router;