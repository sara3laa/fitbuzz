/* eslint-disable no-underscore-dangle */
const asyncRoute = require('route-async');
const boom = require('boom');
const Article = require('../models/article');

const getarticles = async (req, res) => {
  try {
    const docs = await Article.find();
    const response = {
      articles: docs.map(doc => ({
        tile: doc.name,
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
        cpntent: article.content,
        image: article.image,
        request: {
          type: 'POST',
          url: `http://localhost:3000/articles/${article._id}`,
        },
      },
    });
  });
};
const getarticle = async (req, res) => {
  try {
    const id = req.params.articleId;
    const article = await Article.findById(id);
    if (article) {
      res.status(200).json({
        article,
        request: {
          type: 'GET',
          url: `http://localhost:3000/products/${article._id}`,
        },
      });
    }
  } catch (error) {
    throw boom.notFound('article not found');
  }
};

module.exports = {
  getarticles: asyncRoute(getarticles),
  createarticle: asyncRoute(createarticle),
  getarticle: asyncRoute(getarticle),
};
