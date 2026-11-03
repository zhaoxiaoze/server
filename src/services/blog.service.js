const Blog = require('../models/blog.model');
const ApiError = require('../utils/ApiError');

const getBlogs = async () => {
  const blogs = await Blog.find().populate('author', 'name').sort({ createdAt: -1 });
  return blogs;
};

const getBlogById = async (blogId) => {
  const blog = await Blog.findById(blogId).populate('author', 'name');
  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }
  return blog;
};

const createBlog = async (blogBody, authorId) => {
  const blog = await Blog.create({
    ...blogBody,
    author: authorId,
  });
  await blog.populate('author', 'name');
  return blog;
};

const updateBlogById = async (blogId, updateBody) => {
  const blog = await Blog.findByIdAndUpdate(blogId, updateBody, {
    new: true,
    runValidators: true,
  });
  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }
  await blog.populate('author', 'name');
  return blog;
};

const deleteBlogById = async (blogId) => {
  const blog = await Blog.findByIdAndDelete(blogId);
  if (!blog) {
    throw new ApiError(404, 'Blog not found');
  }
  return blog;
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
