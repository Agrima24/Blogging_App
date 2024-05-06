const blog = require("../blog/blog_schema");

module.exports = {
  createBlogValidation: async (req, res, next) => {
    const addBlogValues = await blogValidation.createBlog.validate(req.body, {
      abortEarly: false,
    });
    if (addBlogValues.error) {
      res.status(400).json({
        success: 0,
        error: addBlogValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
  blogLikesValidation: async (req, res, next) => {
    const blogLikeValues = await blogValidation.blogLikes.validate(req.body, {
      abortEarly: false,
    });
    if (blogLikeValues.error) {
      res.status(400).json({
        success: 0,
        error: blogLikeValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
  blodSearchValidation: async (req, res, next) => {
    const seachBlogValues = await blogValidation.searchBlog.validate(req.body, {
      abortEarly: false,
    });
    if (seachBlogValues.error) {
      res.status(400).json({
        success: 0,
        error: seachBlogValues.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
