import Joi from 'joi';

import type { ConfigSharedProperties } from '../types';

export const ConfigSharedPropertiesSchema = Joi.object<ConfigSharedProperties>()
  .keys({
    position: Joi.number().positive().required(),
    label: Joi.string().required(),
    show: Joi.bool().required(),
  })
  .required();
