import Joi from 'joi';

import { FilterKind } from '../constants';
import type { ConfigRangeFilter } from '../types';

import { ConfigSharedPropertiesSchema } from './config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const RangeFilterSchema =
  ConfigSharedPropertiesSchema.append<ConfigRangeFilter>({
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
