const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors');
const Post = require('../models/Post');
const path = require('path');

const createPost = async(req,res) => {
    req.body.user = req.user.userId;

    const post = await Post.create(req.body);
    
    res.status(StatusCodes.CREATED).json({ post });
}

const getAllPosts = async(req,res) => {
    const posts = await Post.find({});
    res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

const getSinglePost = async(req,res) => {
    const { id: postId } = req.params;

   const post = await Post.findOne({ _id:postId }).populate(
    'comments'
   )

   if(!post){
    throw new CustomError.NotFoundError(`No post with id: ${postId}`)
   }
   res.status(StatusCodes.OK).json({ post })
}

const updatePost = async(req,res) => {
  const { id: postId } = req.params;

  const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    throw new CustomError.NotFoundError(`No post with id : ${postId}`);
  }

  res.status(StatusCodes.OK).json({ post });
}

const deletePost = async(req,res) => {
    const { id: postId } = req.params;

    const post = await Post.findOne({ _id:postId })

    if(!post){
     throw new CustomError.NotFoundError(`No post with id: ${postId}`)
    }

    await post.remove();
    res.status(StatusCodes.OK).json({ msg: 'Post Removed!!' })
}

const uploadImage = async(req,res) => {
    res.send('Delete')
}



module.exports = {
    createPost, getAllPosts, 
    getSinglePost, updatePost,
    deletePost, uploadImage
}