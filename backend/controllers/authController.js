const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../Db/models/User');
const crypto = require('crypto');
const vars = require('../veriable/ver');

const { BASE_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS } = vars;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const newUser = new User({ username, email, password: hashedPassword, verificationToken, isVerified: false });
    await newUser.save();

    const verificationLink = `${BASE_URL}/api/auth/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<p>Click the link below to verify your email:</p><a href="${verificationLink}">Verify Email</a>`,
    });

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.redirect(`${BASE_URL}/login`);
  } catch (err) {
    res.status(500).json({ error: 'Error verifying email' });
  }
};

// Signin
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: 'Email not verified. Please check your email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Signin successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  signup,
  verifyEmail,
  signin,
};
