const express = require('express');
const carts = require('../controllers/carts');
const { boomhandler } = require('../middleware/error');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.get('/', carts.getCart);
router.post('/add_to_cart', authenticate, carts.addToCard);
router.post('/remove_from_cart', authenticate, carts.removeFromCart);
router.post('/update_quantity', authenticate, carts.updateQuantity);
router.post('/checkout', authenticate, carts.checkout);
router.use(boomhandler);
module.exports = router;
