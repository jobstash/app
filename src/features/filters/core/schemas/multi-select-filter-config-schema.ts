import Joi from 'joi';

import { FilterKind } from '../constants';
import type { MultiSelectFilterConfig } from '../types';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const MultiSelectFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<MultiSelectFilterConfig>({
    kind: Joi.number().valid(FilterKind.MULTISELECT).required(),
    param_key: ParamKeySchema,
    value: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().required(),
          value: Joi.string().required(),
        }).required(),
      )
      .required(),
  }).required();
