require('dotenv').config();

const vars = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

module.exports = vars;