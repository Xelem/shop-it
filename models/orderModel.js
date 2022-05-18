const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'An order must belong to a buyer'],
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'An order must belong to a seller'],
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      required: [true, 'An order must have at least 1 product'],
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
