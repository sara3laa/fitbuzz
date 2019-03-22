const mongoose = require('mongoose');

const articleSchema = ({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
  }],
  active: { type: Boolean },
});

const Cart = mongoose.model('Cart', articleSchema);
module.exports = Cart;
