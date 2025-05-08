const express = require('express');
const router = express.Router();
const {
  create,
  getAll,
  getBySlug,
  updateStatus
} = require('../controllers/blogController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', authenticate, upload.single('image'), create);
router.get('/', authenticate, getAll);
router.get('/:slug', authenticate, getBySlug);
router.patch('/status/:id', authenticate, isAdmin, updateStatus);

module.exports = router;
