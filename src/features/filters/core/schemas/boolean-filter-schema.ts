import Joi from 'joi';

import { FilterKind } from '../constants';
import type { ConfigBooleanFilter } from '../types';

import { ConfigSharedPropertiesSchema } from './config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const BooleanFilterSchema =
  ConfigSharedPropertiesSchema.append<ConfigBooleanFilter>({
    kind: Joi.number().valid(FilterKind.BOOLEAN).required(),
    param_key: ParamKeySchema,
    value: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().required(),
          value: Joi.boolean().required(),
        }).required(),
      )
      .required(),
  }).required();
