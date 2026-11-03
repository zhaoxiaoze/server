/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: 博客管理
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: 获取全部博客
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: 返回博客列表
 *   post:
 *     summary: 新建博客（管理员）
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 创建成功
 */

/**
 * @swagger
 * /blogs/{blogId}:
 *   get:
 *     summary: 获取单篇博客
 *     tags: [Blog]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 返回单篇博客
 *   put:
 *     summary: 更新博客（管理员）
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 更新成功
 *   delete:
 *     summary: 删除博客（管理员）
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blogId
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
const blogController = require('../../controllers/blog.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const blogValidation = require('../../validations/blog.validation');

// 公开：获取全部博客列表、获取单篇博客
router.get('/', blogController.getBlogs);
router.get('/:blogId', validate(blogValidation.getBlog), blogController.getBlog);

// 需要登录（管理员）：新增、修改、删除博客
router.post('/', auth(), validate(blogValidation.createBlog), blogController.createBlog);
router.put('/:blogId', auth(), validate(blogValidation.updateBlog), blogController.updateBlog);
router.delete('/:blogId', auth(), validate(blogValidation.deleteBlog), blogController.deleteBlog);

module.exports = router;
