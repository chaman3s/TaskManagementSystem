const { check } = require('express-validator');

const validateSignup = [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

const validateSignin = [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password is required').notEmpty(),
];

module.exports = {
  validateSignup,
  validateSignin,
};
