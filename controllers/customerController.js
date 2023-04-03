const AppError = require("../utils/appError");
const Customer = require("./../models/customerModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");


exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.createCustomer = factory.createCust(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);

exports.deleteMe = catchAsync(async (req, res, next) => {
  await Customer.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getSellerCustomers = catchAsync(async (req, res, next) => {
  const sellerId = req.user._id;

  const customers = await Customer.find({ seller: sellerId });

  res.status(200).json({
    status: 'success',
    results: customers.length,
    data: {
      customers,
    },
  });
});

