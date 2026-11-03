const catchAsync = require('../utils/catchAsync');
const commentService = require('../services/comment.service');

// 获取博客评论（公开）
const getComments = catchAsync(async (req, res) => {
  const comments = await commentService.getCommentsByBlogId(req.params.blogId);
  res.send(comments);
});

// 创建评论（登录用户）
const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body, req.user._id);
  res.status(201).send(comment);
});

// 删除评论（作者 / admin）
const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId, req.user._id, req.user.role);
  res.send({ message: 'Comment deleted successfully' });
});

module.exports = {
  getComments,
  createComment,
  deleteComment,
};
