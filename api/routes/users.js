const express = require('express');
const users = require('../controllers/users');
const { boomhandler } = require('../middleware/error');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.get('/', users.userlogin);
router.post('/', users.userSignup);
router.post('/logout', authenticate, users.userlogout);
router.use(boomhandler);
module.exports = router;
