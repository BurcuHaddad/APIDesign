const express = require("express");
const customerController = require("./../controllers/customerController");
const authController = require("./../controllers/authController");


const router = express.Router();

function decideMiddleware(req, res, next) {
  if (req.user.role === 'admin' || req.user.role === 'supervisor') {
    return customerController.getAllCustomers(req, res, next);
  }

  if (req.user.role === 'seller') {
    return customerController.getSellerCustomers(req, res, next);
  }

  return next(new AppError('You do not have permission to perform this action', 403));
}

router
  .route("/")
  .get(authController.protect, decideMiddleware)
  .post(authController.protect, customerController.createCustomer);

router
  .route("/:id")
  .get(authController.protect, customerController.getCustomer)
  .patch(authController.protect, customerController.updateCustomer)
  .delete(authController.protect, customerController.deleteMe);

module.exports = router;
