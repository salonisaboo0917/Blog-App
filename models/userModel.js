const { connection } = require('../config/db');

const createUser = (user, callback) => {
  const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [user.name, user.email, user.password, user.role], callback);
};

const getUserByEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`;
  connection.query(sql, [email], callback);
};

const getAllUsers = callback => {
  const sql = `SELECT id, name, email, role, status, created_at FROM users WHERE deleted_at IS NULL`;
  connection.query(sql, callback);
};

const updatePassword = (userId, hashedPassword, callback) => {
  const sql = `UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?`;
  connection.query(sql, [hashedPassword, userId], callback);
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  updatePassword,
};
