const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors');
const Comment = require('../models/Comment');
const path = require('path');

const getSinglePostComments = async(req,res) => {
    const { id:postId } = req.params
    const comments = await Comment.find({ post:postId })
    res.status(StatusCodes.OK).json({ comments, count: comments.length })
}

module.exports = {
    getSinglePostComments
}