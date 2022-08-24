const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    //Created by only category
    category: {
      type: String,
      required: [true, "Post category is required"],
      default: "All",
    },
    tags: [{
        type: String
    }],
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
      required: [true, "Post description is required"],
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/10/25/09/23/seagull-5683637_960_720.jpg",
    },
    date: {
        type: Date,
        default: Date.now
    },
    numOfComments: [{
      type: Number,
      default: 0,
    }],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//add review virtually
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  justOne: false,
})

//compile
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
