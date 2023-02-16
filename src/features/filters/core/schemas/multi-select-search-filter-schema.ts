import Joi from 'joi';

import { FilterKind } from '../constants';
import type { ConfigMultiSelectSearchFilter } from '../types';

import { ConfigSharedPropertiesSchema } from './config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const MultiSelectSearchFilterSchema =
  ConfigSharedPropertiesSchema.append<ConfigMultiSelectSearchFilter>({
    kind: Joi.number().valid(FilterKind.MULTISELECT_SEARCH).required(),
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
