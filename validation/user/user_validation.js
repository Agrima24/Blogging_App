const user = require("../user/user_schema");

module.exports = {
  userSignupValidation: async (req, res, next) => {
    const result = await user.userSignup.validate(req.body, {
      abortEarly: false,
    });
    if (result.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  loginUserValidation: async (req, res, next) => {
    const result = await user.loginUser.validate(req.body, {
      abortEarly: false,
    });
    if (result.error) {
      res.json({
        success: "failure",
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
