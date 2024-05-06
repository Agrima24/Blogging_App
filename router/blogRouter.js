const express = require('express');
const router = express.Router();
const {upload} = require('../middlewares/image_storage')
const auth = require('../middlewares/auth_middleware')
const blog = require('../controllers/blogController');


router.post('/create/:id',upload.single("blogImage"),blog.createBlog);
router.get('/list',auth.checkUSerAuth,blog.blogList);
router.get('/details/:id',auth.checkUSerAuth,blog.blogDetails)
router.patch('/like/:id',blog.blogLikes)
router.get('/search',auth.checkUSerAuth,blog.blogSearch);
router.patch('/edit/:id',auth.checkUSerAuth,blog.blogEdit);
router.delete('/delete/:id',auth.checkUSerAuth,blog.blogDelete)
router.get('/myBlog/:id',auth.checkUSerAuth,blog.myBlog)

module.exports = router
