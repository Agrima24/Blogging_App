const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModelSchema");
const {
  transporter,
  mailOptions,
  sendMail,
} = require("../service/emailService");

const userSignup = async (req, res) => {
  try {
    const isEmailExist = await userSchema.findOne({
      userEmail: req.body.userEmail,
    });
    if (isEmailExist) {
      res.status(400).json({
        success: "failure",
        message: "User with this email is already exist",
      });
    } else {
      const userData = await new userSchema(req.body);
      try {
        const salt = await bcrypt.genSalt(10);
        userData.userPassword = await bcrypt.hash(req.body.userPassword, salt);
        const filePath = `/uploads/${req.file.filename}`;
        userData.profilePic = filePath;
        const info = userData.save();
        res.status(201).json({
          success: "success",
          message: "Signup successfully",
        });
      } catch (err) {
        res.status(400).json({
          success: "failure",
          error: err.message,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    if (userEmail && userPassword) {
      const user = await userSchema.findOne({ userEmail: userEmail });
      if (user != null) {
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (user.userEmail === userEmail && isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "10d" }
          );
          res.status(200).json({
            success: "success",
            message: "Successfully login",
            user_details: user,
            token: token,
          });
        } else {
          res.status(400).json({
            success: "failure",
            message: "Email or password is not valid",
          });
        }
      } else {
        res.status(400).json({
          success: "failure",
          message: "Invalid credentials",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (userEmail) {
      const isEmailExist = await userSchema.findOne({ userEmail: userEmail });
      if (isEmailExist) {
        const token = jwt.sign(
          { userEmail: userEmail },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30min" }
        );
        const success = await sendMail(
          req.body.userEmail,
          token,
          isEmailExist._id
        );
        res.status(200).json({
          success: "success",
          message: "You are register user now you can add new password",
        });
      } else {
        res.status(400).json({
          success: "failure",
          message: "you are not register user",
        });
      }
    } else {
      res.status(400).json({
        success: "failure",
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { token, id } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await userSchema.findById(id);
    if (checkUser != null) {
      const secretKey = process.env.JWT_SECRET_KEY;
      jwt.verify(token, secretKey);
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(confirmPassword, salt);
        await userSchema.findByIdAndUpdate(checkUser._id, {
          $set: { password: password },
        });
        res.status(200).json({
          success: "success",
          message: "password update Successfully",
        });
      } else {
        res.status(400).json({
          success: "failure",
          message: "password not matched",
        });
      }
    } else {
      res.status(400).json({
        success: "failure",
        message: "Authorization failed",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  forgetPassword,
  changePassword,
};
