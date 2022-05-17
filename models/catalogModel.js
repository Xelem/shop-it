const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'A catalog must belong to a seller'],
  },
  products: [
    new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'Please put in the product name'],
        minlength: [3, 'A product name cannot be less than 3 characters'],
        maxlength: [20, 'A product name cannot be less than 20 characters'],
      },
      price: {
        type: Number,
        required: [true, 'Please put in the product price in dollars'],
      },
    }),
  ],
});

const Catalog = mongoose.model('Catalog', catalogSchema);
module.exports = Catalog;
