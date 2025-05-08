const db = require('../config/db');


const createCategory = (category, callback) => {
  const sql = `INSERT INTO categories (name, slug, status) VALUES (?, ?, ?)`;
  connection.query(sql, [category.name, category.slug, category.status], callback);
};

const getAllCategories = callback => {
  const sql = `SELECT * FROM categories WHERE deleted_at IS NULL`;
  connection.query(sql, callback);
};

module.exports = {
  createCategory,
  getAllCategories,
};
