import Joi from 'joi';

import type { FilterConfigSharedProperties } from '../types';

export const FilterConfigSharedPropertiesSchema =
  Joi.object<FilterConfigSharedProperties>()
    .keys({
      position: Joi.number().positive().required(),
      label: Joi.string().required(),
      show: Joi.bool().required(),
    })
    .required();
