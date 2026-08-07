const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


// all crud things are happening 
router.route('/').get(getProducts).post(protect, adminMiddleware, upload.single('image'), createProduct);
router.route('/:id').get(getProductById).put(protect, adminMiddleware,updateProduct).delete(protect, adminMiddleware, deleteProduct);

module.exports = router;