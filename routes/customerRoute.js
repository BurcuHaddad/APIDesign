const express = require("express");
const customerController = require("./../controllers/customerController");
const authController = require("./../controllers/authController");


const router = express.Router();

router
  .route("/")
  .get(authController.protect,authController.restrictTo("admin", "supervisor"), customerController.getAllCustomers)
  .post(authController.protect, customerController.createCustomer);

router
  .route("/:id")
  .get(authController.protect, customerController.getCustomer)
  .patch(authController.protect, customerController.updateCustomer)
  .delete(authController.protect, customerController.deleteMe);

module.exports = router;
