import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String },
    tags: { type: String },
    image: {
      type: String,
      default:
        "https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-1030x584.png",
    },
    description: {
      type: [String],
    },
    read: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
