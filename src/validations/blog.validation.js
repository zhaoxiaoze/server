const Joi = require('joi');

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().trim().min(3).max(120).required(),
    content: Joi.string().trim().min(10).required(),
  }),
};

const updateBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().trim().min(3).max(120),
      content: Joi.string().trim().min(10),
    })
    .min(1), // 至少传一个字段更新
};

const getBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().required(),
  }),
};

const deleteBlog = {
  params: Joi.object().keys({
    blogId: Joi.string().required(),
  }),
};

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};
