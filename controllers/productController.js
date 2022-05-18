const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Catalog = require('../models/catalogModel');
const Order = require('../models/orderModel');

exports.createCatalog = catchAsync(async (req, res, next) => {
  if (!req.body.seller) {
    req.body.seller = req.user._id;
  }
  const newCatalog = await Catalog.create(req.body);

  res.status(201).json({
    status: 'success',
    catalog: newCatalog,
  });
});

exports.getCatalog = catchAsync(async (req, res, next) => {
  const catalog = await Catalog.find({ seller: req.params.seller_id });
  if (!catalog)
    return next(new AppError('There is no catalog linked to this user'));

  res.status(200).json({
    status: 'success',
    catalog,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const catalog = await Catalog.find({ seller: req.params.seller_id });
  if (!catalog)
    return next(new AppError('There is no catalog linked to this user'));

  const products = catalog[0].products.map((product) => product._id.toString());
  const order = req.body.products;

  order.forEach((item) => {
    if (!products.includes(item)) {
      return next(new AppError('You cannot place this order'));
    }
  });

  if (!req.body.seller || !req.body.buyer) {
    req.body.buyer = req.user._id;
    req.body.seller = catalog[0].seller;
  }
  const newOrder = await Order.create(req.body);

  res.status(201).json({
    status: 'success',
    order: newOrder,
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ seller: req.user._id });

  res.status(200).json({
    status: 'success',
    orders,
  });
});
