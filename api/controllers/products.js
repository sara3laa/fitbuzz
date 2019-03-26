/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const asyncRoute = require('route-async');
const boom = require('boom');
// const mongoose = require('mongoose');
const Product = require('../models/product');

const getproducts = async (req, res) => {
  try {
    const docs = await Product.find();
    const response = {
      count: docs.length,
      products: docs.map(doc => ({
                                     name: doc.name,
                                     price: doc.price,
                                     image: doc.image,
                                     _id: doc._id,
        })),
    };
    res.status(200).json(response);
  } catch (error) {
    throw boom.badRequest(error);
  }
};

const createproduct = async (req, res) => {
 const product = new Product({
   name: req.body.name,
   price: req.body.price,
   image: req.body.image,
   qty: req.body.qty,
 });
 // eslint-disable-next-line no-shadow
 await product.save((err, product) => {
  if (err) throw boom.badRequest(err);
  res.status(201).json({
   message: 'Created product successfully',
   createdProduct: {
     name: product.name,
     price: product.price,
     image: product.image,
     qty: product.qty,
   },
 });
});
};


const getproduct = async (req, res) => {
    try {
      const id = req.params.productId;
      const product = await Product.findById(id);
       if (product) {
         res.status(200).json({
           product,
           request: {
            type: 'GET',
            url: `http://localhost:3000/products/${product._id}`,
           },
         });
       }
    } catch (error) {
      throw boom.notFound('product not found');
    }
};

const editproduct = async (req, res) => {
  const id = req.params.productId;

  const product = await Product.updateOne({ _id: id }, req.body);
    if (!product) throw boom.badData('worng data');
    res.status(200).json({
      message: 'Product Updated',
      request: {
       type: 'PATCH',
       url: `http://localhost:3000/products/${product._id}`,
      },
    });
};
module.exports = {
  getproducts: asyncRoute(getproducts),
  createproduct: asyncRoute(createproduct),
  getproduct: asyncRoute(getproduct),
  editproduct: asyncRoute(editproduct),

};
