const mongoose = require('mongoose');

const productSchema = ({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  image: { type: String },
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
