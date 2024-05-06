const express = require('express')
const router = express.Router();
const comment = require('../controllers/commentController')

router.post('/comment/:bId/:uId',comment.createComment);

module.exports = router
