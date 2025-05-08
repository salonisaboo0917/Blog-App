const {
  createBlog,
  getAllBlogs,
  getActiveBlogs,
  getBlogBySlug,
  updateBlogStatus
} = require('../models/blogModel');
const { blogSchema } = require('../validators');
const slugify = require('../utils/slug/generateSlug');

exports.create = (req, res) => {
  const { error } = blogSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { title, content, category_id } = req.body;
  const blog = {
    title,
    slug: slugify(title),
    content,
    image: req.file?.filename,
    user_id: req.user.id,
    category_id,
    status: 'active',
  };

  createBlog(blog, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create blog' });
    res.status(201).json({ message: 'Blog created' });
  });
};

exports.getAll = (req, res) => {
  const fetch = req.user.role === 'admin' ? getAllBlogs : getActiveBlogs;
  fetch((err, blogs) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch blogs' });
    res.json(blogs);
  });
};

exports.getBySlug = (req, res) => {
  getBlogBySlug(req.params.slug, (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json(results[0]);
  });
};

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  updateBlogStatus(id, status, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update blog status' });
    res.json({ message: 'Blog status updated' });
  });
};
