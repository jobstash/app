import Joi from 'joi';

import { FilterKind } from '../constants';
import type { DateFilterConfig } from '../types';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const DateFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<DateFilterConfig>({
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
