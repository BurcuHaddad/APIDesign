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

exports.isCustomerOwner = async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  if (req.user.role === "admin" || req.user.role === "supervisor") {
    req.customer = customer;
    return next();
  }

  if (customer.seller.toString() !== req.user._id.toString()) {
    return next(new AppError("You are not authorized to perform this action", 403));
  }

  req.customer = customer;
  next();
}
