const express = require('express');
const { signup, verifyEmail, signin } = require('../controllers/authController');
const { validateSignup, validateSignin } = require('../validators/authValidator');
const { validationResult } = require('express-validator');

const router = express.Router();

router.post('/signup', validateSignup, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, signup);

router.get('/verify-email', verifyEmail);

router.post('/signin', validateSignin, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, signin);

module.exports = router;
