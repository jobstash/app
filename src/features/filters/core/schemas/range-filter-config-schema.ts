import Joi from 'joi';

import { FILTER_KIND_RANGE } from '../constants';
import type { RangeFilterConfig } from '../interfaces';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const RangeFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<RangeFilterConfig>({
    kind: Joi.string().valid(FILTER_KIND_RANGE).required(),
    stepSize: Joi.number().positive().required(),
    value: Joi.object({
      lowest: Joi.object({
        paramKey: ParamKeySchema,
        value: Joi.number()
          .required()
          .min(0)
          .less(Joi.ref('highest.value', { ancestor: 2 })),
      }).required(),
      highest: Joi.object({
        paramKey: ParamKeySchema,
        value: Joi.number().required(),
      }).required(),
    }),
  }).required();
