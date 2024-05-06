const express = require("express");
const router = express.Router();

const userRoute = require("./userRouter");
const blogRoute = require("./blogRouter");
const commentRoute = require("./commentRouter");

router.use("/user", userRoute);
router.use("/blog", blogRoute);
router.use("/comment",commentRoute)

module.exports = router;
