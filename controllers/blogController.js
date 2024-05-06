const blogSchema = require("../models/blogModelSchema");
const commentSchema = require("../models/commentModelSchema");


const createBlog = async (req, res) => {
  const id = req.params.userId;
  try {
    const blog = await new blogSchema(req.body);
    const filePath = `/uploads/${req.file.filename}`;
    blog.blogImage = filePath;
    const info = blog.save();
    res.status(201).json({
      success: "success",
      message: "Blog create successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const blogList = async (req, res) => {
  try {
    const list = await blogSchema.find();
    res.status(200).json({
      success: "success",
      message: "Here is the list of blogs",
      blogData: list,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const blogDetails = async (req, res) => {
  try {
    const details = await commentSchema.find({ blogId : req.params.id})
    .populate({
      path: "userId",
      select: "userName profilePic"
    })
    .populate({
      path : "blogId"
    })
    if (details) {
      res.status(200).json({
        success: "success",
        message: "Here is the details of blog",
        blog: details,
      });
    } else {
      res.status(400).json({
        success: "failure",
        message: "blog is not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const blogLikes = async (req, res) => {
  const id = req.params.id;
  const { blogLikes } = req.body;
  try {
    const likes = await blogSchema.findById(id);
    if (blogLikes == true) {
      await likes.updateOne({ $set: { blogLikes: ++likes.blogLikes } });
      res.status(202).json({
        success: "success",
        message: "You liked a blog",
        likedBlog: likes.blogLikes,
      });
    } else {
      await likes.updateOne({ $set: { blogLikes: --likes.blogLikes } });
      res.status(202).json({
        success: "success",
        message: "You removed a like",
        unlikedBlog: likes.blogLikes,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const blogSearch = async (req, res) => {
  const blogTitle = req.body.blogTitle;
  try {
    const query = { blogTitle: { $regex: blogTitle, $options: "i" } };
    const search = await blogSchema.find(query);
    if (search) {
      res.status(200).json({
        success: "success",
        message: "All blogs related to search",
        blogSearch: search,
      });
    } else {
      res.status(400).json({
        success: "failure",
        message: "this blog does not exist",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

const blogEdit = async (req, res) => {
  try {
    const edit = await blogSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: "success",
      message: "Edit blog successfully",
      blogEdit: edit,
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const blogDelete = async (req, res) => {
  await blogSchema.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({
      success: "success",
      message: "Delete blog successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: " failure",
      error: err.message,
    });
  }
};

const myBlog = async (req, res) => {
  try {
    const userBlog = await blogSchema.find({ userId: req.params.id }).populate({
      path: "userId",
      select: "userName profilePic",
    });
    res.status(200).json({
      success: "success",
      message: "All myblogs",
      blog: userBlog,
    });
  } catch (err) {
    res.status(400).json({
      success: "failure",
      error: err.message,
    });
  }
};

module.exports = {
  createBlog,
  blogList,
  blogDetails,
  blogLikes,
  blogSearch,
  blogEdit,
  blogDelete,
  myBlog,
};
