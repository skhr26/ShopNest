const express = require('express');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, adminMiddleware, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/status').put(protect, adminMiddleware, updateOrderStatus);

module.exports = router;