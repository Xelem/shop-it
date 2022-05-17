const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Catalog = require('../models/catalogModel');

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
