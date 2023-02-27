import Joi from 'joi';

import { FILTER_KIND_MULTISELECT_WITH_SEARCH } from '../constants';
import type { MultiSelectSearchFilterConfig } from '../interfaces';

import { FilterConfigSharedPropertiesSchema } from './filter-config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const MultiSelectSearchFilterConfigSchema =
  FilterConfigSharedPropertiesSchema.append<MultiSelectSearchFilterConfig>({
    kind: Joi.string().valid(FILTER_KIND_MULTISELECT_WITH_SEARCH).required(),
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
