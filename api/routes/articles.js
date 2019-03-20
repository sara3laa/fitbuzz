const express = require('express');
const articles = require('../controllers/articles');
const { boomhandler } = require('../middleware/error');

const router = express.Router();
router.get('/', articles.getarticles);
router.post('/', articles.createarticle);
router.get('/:articleId', articles.getarticle);
router.use(boomhandler);
module.exports = router;
