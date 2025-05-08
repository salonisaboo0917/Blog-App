const express = require('express');
const router = express.Router();
const { create, getAll } = require('../controllers/categoryController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticate, isAdmin, create);
router.get('/', authenticate, getAll);

module.exports = router;
