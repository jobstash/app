import Joi from 'joi';

import { FILTER_KIND_SINGLESELECT } from '../constants';
import type { SingleSelectFilterConfig } from '../interfaces';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const SingleSelectFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<SingleSelectFilterConfig>({
    kind: Joi.string().valid(FILTER_KIND_SINGLESELECT).required(),
    paramKey: ParamKeySchema,
    options: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().required(),
          value: Joi.string().required(),
        }).required(),
      )
      .required(),
  }).required();
