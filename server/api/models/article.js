const mongoose = require('mongoose');

const articleSchema = ({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
