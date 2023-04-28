const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const msgController = require("../controllers/msgController");

const router = express.Router();

router.post("/signup", authController.signup);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.post("/sendEmail", msgController.sendMail);
router.post("/sendBulk", msgController.sendBulkEmail);
router.post("/sendSelectedBulk", msgController.sendSelectedBulkEmail);
router.post("/sendMessage", msgController.sendMessage);
router.post("/sendBulkMessage", msgController.sendBulkMessage);
router.post("/selectedWhatsapp", msgController.sendSelectedBulkMessage);
router.post("/sendSMS", msgController.sendSMS);

router.patch("/updateMyPassword", authController.updatePassword);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "supervisor"),
    userController.getAllUsers
  );

//Obtained user from JWT
router.patch("/updateMe", userController.updateMe);

router.delete("/:id", userController.deleteMe);

//router.route("/:id").delete(userController.deleteUser)
router.route("/:id").patch(userController.updateMe);

module.exports = router;
