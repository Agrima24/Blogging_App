const commentSchema = require("../models/commentModelSchema");

const createComment = async (req, res) => {
  try {
    const comment = await new commentSchema(req.body);
    comment.blogId = req.params.bId;
    comment.userId = req.params.uId;
    await comment.populate({
      path: "userId",
      select: "userName profilePic",
    });
    const info = await comment.save();
    res.status(200).json({
      success: "success",
      message: "comment successfully added",
      commentData: info,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

module.exports = {
  createComment,
};
