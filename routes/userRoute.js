const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();



router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/sendEmail", authController.protect, authController.sendMail);
router.post("/sendBulk", authController.protect, authController.sendBulkEmail);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);



router
  .route("/")
  .get(authController.protect,authController.restrictTo("admin", "supervisor"),userController.getAllUsers)


//Obtained user from JWT
router.patch("/updateMe", userController.updateMe);


router.delete("/:id", userController.deleteMe);

//router.route("/:id").delete(userController.deleteUser)
router.route("/:id").patch(userController.updateMe)

module.exports = router