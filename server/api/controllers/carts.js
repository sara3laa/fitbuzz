/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
const Boom = require('boom');
const asyncRoute = require('route-async');
const { Cart, Product, Order } = require('../models');

const getCart = async (req, res) => {
  const userId = req.query.user_id;
  if (!userId) throw Boom.badRequest('missing user id');
  const cart = await Cart.findOne({ user: userId }).lean();
  if (!cart) throw Boom.notFound('cart not found');
  res.status(200).json(cart);
};

const addToCard = async (req, res) => {
  const { product_id: productId, user_id: userId, quantity } = req.body;
  if (!productId) throw Boom.badRequest('missing product id');
  if (!userId) throw Boom.badRequest('missing user id');
  if (!quantity) throw Boom.badRequest('missing quantity');
  const product = await Product.findById(productId);
  if (!product) throw Boom.badRequest('product not found');
  if (quantity > product.qty) {
    throw Boom.badRequest('number of avaliable products not enough');
  }
  const addProduct = {
    product_id: product._id, quantity, image: product.image, name: product.name,
  };
  product.qty -= quantity;
  await product.save();
  await Cart.update({ user: userId }, {
    $push: { products: addProduct },
    $set: { active: true },
  }, { upsert: true });
  res.status(204);
  res.json('add to cart');
};

const removeFromCart = async (req, res) => {
  const { product_id: productId, user_id: userId } = req.body;
  if (!productId) throw Boom.badRequest('missing product id');
  if (!userId) throw Boom.badRequest('missing user id');
  const cart = await Cart.findOne({ user: userId });
  const cartProduct = cart.products.filter((p) => {
    if (p.product_id.toString() === productId) return p;
  });
  cart.products = cart.products.filter((p) => {
    // eslint-disable-next-line eqeqeq
    if (p.product_id.toString() != productId) return p;
  });
  await cart.save();
  await Product.update({ _id: productId }, { $inc: { qty: cartProduct[0].quantity } });

  res.status(204);
  res.json('removed from cart');
};

const updateQuantity = async (req, res) => {
  const { product_id: productId, user_id: userId, quantity } = req.body;
  if (!productId) throw Boom.badRequest('missing product id');
  if (!userId) throw Boom.badRequest('missing user id');
  if (!quantity) throw Boom.badRequest('missing quantity');
  const product = await Product.findById(productId);
  if (!product) throw Boom.badRequest('product not found');
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw Boom.badRequest('cart not found');
  const cartProduct = cart.products.filter((p) => {
    if (p.product_id.toString() === productId) return p;
  });
  const quantityDelta = quantity - cartProduct[0].quantity;
  if (quantityDelta > product.qty) {
    throw Boom.badRequest('number of avaliable products not enough');
  }
  let oldqty; let
    proqty;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cart.products.length; i++) {
    if (cart.products[i].product_id.toString() === productId) {
      oldqty = cart.products[i].quantity;
      cart.products[i].quantity = quantity;
      break;
    }
  }
  if (oldqty > quantity) {
    proqty = product.qty + (oldqty - quantity);
  } else {
    proqty = product.qty - (quantity - oldqty);
  }
  await cart.save();
  await product.update({ qty: proqty });
  res.status(204);
  res.json('updatedQuantiy');
};

const checkout = async (req, res) => {
  const { user_id: userId, address } = req.body;
  const cart = await Cart.findOne({ user: userId });
  await Order.create({ user: userId, products: cart.products, address });
  cart.products = [];
  cart.active = false;
  await cart.save();
  res.status(204);
};

module.exports = {
  getCart: asyncRoute(getCart),
  addToCard: asyncRoute(addToCard),
  removeFromCart: asyncRoute(removeFromCart),
  updateQuantity: asyncRoute(updateQuantity),
  checkout: asyncRoute(checkout),
};
