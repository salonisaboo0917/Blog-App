const db = require('../config/db');


const createBlog = (blog, callback) => {
  const sql = `INSERT INTO blogs (title, slug, content, image, user_id, category_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [blog.title, blog.slug, blog.content, blog.image, blog.user_id, blog.category_id, blog.status], callback);
};

const getAllBlogs = callback => {
  const sql = `SELECT * FROM blogs WHERE deleted_at IS NULL`;
  connection.query(sql, callback);
};

const getActiveBlogs = callback => {
  const sql = `SELECT * FROM blogs WHERE status = 'active' AND deleted_at IS NULL`;
  connection.query(sql, callback);
};

const getBlogBySlug = (slug, callback) => {
  const sql = `SELECT * FROM blogs WHERE slug = ? AND deleted_at IS NULL`;
  connection.query(sql, [slug], callback);
};

const updateBlogStatus = (id, status, callback) => {
  const sql = `UPDATE blogs SET status = ?, updated_at = NOW() WHERE id = ?`;
  connection.query(sql, [status, id], callback);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getActiveBlogs,
  getBlogBySlug,
  updateBlogStatus,
};
