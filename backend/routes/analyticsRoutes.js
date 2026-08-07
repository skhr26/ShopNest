const express = require('express');
const { getAdminStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const {  adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', protect, adminMiddleware, getAdminStats);

module.exports = router;