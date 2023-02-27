import Joi from 'joi';

import type { FilterConfigSharedProperties } from '../interfaces';

export const FilterConfigSharedPropertiesSchema =
  Joi.object<FilterConfigSharedProperties>()
    .keys({
      position: Joi.number().positive().required(),
      label: Joi.string().required(),
      show: Joi.bool().required(),
      googleAnalyticsEventName: Joi.string(),
      googleAnalyticsEventId: Joi.string(),
    })
    .required();
