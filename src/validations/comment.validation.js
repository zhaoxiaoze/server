const Joi = require('joi');

const createComment = {
  body: Joi.object().keys({
    blog: Joi.string().required(),
    content: Joi.string().trim().max(500).required(),
  }),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().required(),
  }),
};

module.exports = {
  createComment,
  deleteComment,
};
