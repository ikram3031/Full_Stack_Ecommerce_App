const express = require('express')
const router = express.Router()
const {authenticateUser,authorizePermissions} = require('../middleware/authentication')

const { createPost, getAllPosts, 
    getSinglePost, updatePost,
    deletePost, uploadImage } = require('../controllers/postController')

const { getSinglePostComments } = require('../controllers/commentController');

router.route('/')
  .get(getAllPosts)
  .post(authenticateUser, authorizePermissions('admin','contributor'), createPost)

router.route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin','contributor')], uploadImage)

router.route('/:id')
  .get(getSinglePost)
  .patch(authenticateUser, authorizePermissions('admin','contributor'), updatePost)
  .delete(authenticateUser, authorizePermissions('admin','contributor'), deletePost)

router.route('/:id/comments')
  .get(getSinglePostComments)

module.exports = router;