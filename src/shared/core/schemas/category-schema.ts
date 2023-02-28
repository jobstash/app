import Joi from 'joi';

import type { Category } from '../interfaces';

export const CategorySchema = Joi.object<Category>({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
});
