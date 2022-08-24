const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
   type: String,
   trim: true,
   required: [true, 'Please provide comment text']
  },
  date: {
   type: Date,
   default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true,
  }
},
{ timestamps: true }
)    

module.exports = mongoose.model('Comment', commentSchema); 