const Joi = require('joi');

exports.registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category_id: Joi.number().required(),
});
