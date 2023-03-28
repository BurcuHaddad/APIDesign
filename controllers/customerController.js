const { router } = require("..");
const AppError = require("../utils/appError");
const Customer = require("./../models/customerModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.createCustomer = factory.createOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);

