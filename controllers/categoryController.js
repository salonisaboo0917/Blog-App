const { createCategory, getAllCategories } = require('../models/categoryModel');
const slugify = require('../utils/slug/generateSlug');

exports.create = (req, res) => {
  const { name } = req.body;
  const category = {
    name,
    slug: slugify(name),
    status: 'active',
  };
  createCategory(category, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create category' });
    res.status(201).json({ message: 'Category created' });
  });
};

exports.getAll = (req, res) => {
  getAllCategories((err, categories) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch categories' });
    res.json(categories);
  });
};
