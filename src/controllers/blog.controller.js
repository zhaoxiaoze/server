const catchAsync = require('../utils/catchAsync');
const blogService = require('../services/blog.service');

// 获取全部博客
const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs();
  res.send(blogs);
});

// 获取单篇博客
const getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.blogId);
  res.send(blog);
});

// 创建博客（admin）
const createBlog = catchAsync(async (req, res) => {
  const blog = await blogService.createBlog(req.body, req.user._id);
  res.status(201).send(blog);
});

// 更新博客（admin）
const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlogById(req.params.blogId, req.body);
  res.send(blog);
});

// 删除博客（admin）
const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlogById(req.params.blogId);
  res.send({ message: 'Blog deleted successfully' });
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
