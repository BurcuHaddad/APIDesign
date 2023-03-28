const express = require("express");
const customerController = require("./../controllers/customerController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(customerController.getAllCustomers)
  .post(authController.protect, customerController.createCustomer);

router
  .route("/:id")
  .get(customerController.getCustomer)
  .patch(authController.protect, customerController.updateCustomer)
  .delete(authController.protect, customerController.deleteCustomer);


module.exports = router