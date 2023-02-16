import Joi from 'joi';

import { FilterKind } from '../constants';
import type { ConfigDateFilter } from '../types';

import { ConfigSharedPropertiesSchema } from './config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const DateFilterSchema =
  ConfigSharedPropertiesSchema.append<ConfigDateFilter>({
    kind: Joi.number().valid(FilterKind.DATE).required(),
    param_key: ParamKeySchema,
    value: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().required(),
          value: Joi.number().required(),
        }).required(),
      )
      .required(),
  }).required();
