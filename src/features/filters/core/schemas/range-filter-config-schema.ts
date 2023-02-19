import Joi from 'joi';

import { FilterKind } from '../constants';
import type { RangeFilterConfig } from '../types';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const RangeFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<RangeFilterConfig>({
    kind: Joi.number().valid(FilterKind.RANGE).required(),
    step_size: Joi.number().positive().required(),
    value: Joi.object({
      lowest: Joi.object({
        param_key: ParamKeySchema,
        value: Joi.number()
          .required()
          .min(0)
          .less(Joi.ref('highest.value', { ancestor: 2 })),
      }).required(),
      highest: Joi.object({
        param_key: ParamKeySchema,
        value: Joi.number().required(),
      }).required(),
    }),
  }).required();
