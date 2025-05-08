const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticate, isAdmin, getAllUsers);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
