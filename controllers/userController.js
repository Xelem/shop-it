const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllSellers = catchAsync(async (req, res, next) => {
  const allSellers = await User.find({ role: 'seller' });

  res.status(200).json({
    status: 'success',
    sellers: allSellers,
  });
});
