const express = require('express');
const articles = require('../controllers/articles');
const { boomhandler } = require('../middleware/error');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.get('/', articles.getarticles);
router.post('/', authenticate, articles.createarticle);
router.get('/:articleId', articles.getarticle);
router.use(boomhandler);
module.exports = router;
