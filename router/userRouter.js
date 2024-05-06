const express = require("express");
const router = express.Router();

const user = require("../controllers/userController");
const auth = require("../middlewares/auth_middleware");
const {upload} = require('../middlewares/image_storage')
const validation = require("../validation/user/user_validation");

router.post("/signup", upload.single("profilePic"),validation.userSignupValidation, user.userSignup);
router.post("/login", validation.loginUserValidation, user.userLogin);
router.post("/resetpassword", auth.checkUSerAuth, user.forgetPassword);
router.post(
  "/changepassword/:token/:id",
  auth.checkUSerAuth,
  user.changePassword
);

module.exports = router;
