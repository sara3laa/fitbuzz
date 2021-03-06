const express = require('express');
const products = require('../controllers/products');
const { boomhandler } = require('../middleware/error');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.get('/', products.getproducts);
router.post('/', authenticate, products.createproduct);
router.get('/:productId', products.getproduct);
router.patch('/:productId', authenticate, products.editproduct);
router.use(boomhandler);
module.exports = router;
