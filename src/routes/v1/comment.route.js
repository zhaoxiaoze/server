/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: 评论管理
 */

/**
 * @swagger
 * /comments/{blogId}:
 *   get:
 *     summary: 获取博客下所有评论
 *     tags: [Comment]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 返回评论列表
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: 发表评论（登录用户）
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blog
 *               - content
 *             properties:
 *               blog:
 *                 type: string
 *                 description: 博客ID
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 评论创建成功
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: 删除评论（评论作者或管理员）
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 删除成功
 */

const express = require('express');

const router = express.Router();
const commentController = require('../../controllers/comment.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');

// 公开接口：查看博客下所有评论
router.get('/:blogId', commentController.getComments);

// 需要登录：发表评论
router.post('/', auth(), validate(commentValidation.createComment), commentController.createComment);

// 需要登录：删除评论（自动校验权限在service里面）
router.delete('/:commentId', auth(), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = router;
