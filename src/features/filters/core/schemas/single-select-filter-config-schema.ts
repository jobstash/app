import Joi from 'joi';

import { FilterKind } from '../constants';
import type { SingleSelectFilterConfig } from '../types';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const SingleSelectFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<SingleSelectFilterConfig>({
    kind: Joi.number().valid(FilterKind.SINGLESELECT).required(),
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
