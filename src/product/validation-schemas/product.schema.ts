import Joi from 'joi';

export const ProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
}).options({
  abortEarly: false,
});
