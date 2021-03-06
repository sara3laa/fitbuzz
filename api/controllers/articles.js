/* eslint-disable no-underscore-dangle */
const asyncRoute = require('route-async');
const boom = require('boom');
const Article = require('../models/article');

const getarticles = async (req, res) => {
  try {
    const docs = await Article.find();
    const response = {
      articles: docs.map(doc => ({
        title: doc.title,
        image: doc.image,
        _id: doc._id,
      })),
    };
    res.status(200).json(response);
  } catch (error) {
    throw boom.badRequest(error);
  }
};

const createarticle = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  });
    // eslint-disable-next-line no-shadow
  await article.save((err, article) => {
    if (err) throw boom.badRequest(err);
    res.status(201).json({
      message: 'Created article successfully',
      createdarticle: {
        title: article.title,
        content: article.content,
        image: article.image,
      },
    });
  });
};
const getarticle = async (req, res) => {
  const id = req.params.articleId;
  const article = await Article.findById(id);
  if (!article) throw boom.notFound('not found article');
  res.status(200).json(article);
};

module.exports = {
  getarticles: asyncRoute(getarticles),
  createarticle: asyncRoute(createarticle),
  getarticle: asyncRoute(getarticle),
};
