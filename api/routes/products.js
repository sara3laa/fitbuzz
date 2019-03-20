const express = require('express');
const products = require('../controllers/products');
// const { boomhandler } = require('../middleware/error');

const router = express.Router();
router.get('/', products.getproducts);
router.post('/', products.createproduct);
router.get('/:productId', products.getproduct);
router.patch('/:productId', products.editproduct);
// router.use(boomhandler);
module.exports = router;
