import Joi from 'joi';

import { FilterKind } from '../constants';
import type { BooleanFilterConfig } from '../types';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const BooleanFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<BooleanFilterConfig>({
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
