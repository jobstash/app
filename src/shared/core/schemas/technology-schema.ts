import Joi from 'joi';

import type { Technology } from '../interfaces';

export const TechnologySchema = Joi.object<Technology>({
  id: Joi.string().uuid().required(),
  name: Joi.string().required(),
});
