const Comment = require('../models/comment.model');
const ApiError = require('../utils/ApiError');
/**
 * 获取一篇博客的所有评论
 * @param {string} blogId
 */
const getCommentsByBlogId = async (blogId) => {
  const comments = await Comment.find({ blog: blogId }).populate('user', 'name').sort({ createdAt: -1 });
  return comments;
};

/**
 * 创建评论（登录用户）
 * @param {Object} commentBody
 * @param {string} userId
 */
const createComment = async (commentBody, userId) => {
  const comment = await Comment.create({
    ...commentBody,
    user: userId,
  });
  await comment.populate('user', 'name');
  return comment;
};

/**
 * 删除评论：只能本人 or admin
 * @param {string} commentId
 * @param {string} userId
 * @param {string} role
 */
const deleteCommentById = async (commentId, userId, role) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, 'Comment not found');
  }
  // 不是管理员，并且不是评论作者 → 禁止删除
  if (role !== 'admin' && comment.user.toString() !== userId) {
    throw new ApiError(403, 'Forbidden: you cannot delete this comment');
  }
  await comment.deleteOne();
  return comment;
};

module.exports = {
  getCommentsByBlogId,
  createComment,
  deleteCommentById,
};
