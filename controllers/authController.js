const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail, getAllUsers, updatePassword } = require('../models/userModel');
const { registerSchema, loginSchema } = require('../validators');
const { sendResetEmail } = require('../utils/nodeMail/sendEmail');

exports.register = (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, email, password } = req.body;

  getUserByEmail(email, async (err, results) => {
    if (results.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { name, email, password: hashedPassword, role: 'user' };

    createUser(user, (err) => {
      if (err) return res.status(500).json({ error: 'Registration failed' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

exports.login = (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  getUserByEmail(email, async (err, results) => {
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  });
};

exports.getAllUsers = (req, res) => {
  getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users' });
    res.json(users);
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  getUserByEmail(email, async (err, results) => {
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await sendResetEmail(email, token);

    res.json({ message: 'Reset link sent to email' });
  });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);
    updatePassword(decoded.id, hashed, (err) => {
      if (err) return res.status(500).json({ error: 'Password reset failed' });
      res.json({ message: 'Password updated successfully' });
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};
