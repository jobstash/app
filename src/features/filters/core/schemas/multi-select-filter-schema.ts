import Joi from 'joi';

import { FilterKind } from '../constants';
import type { ConfigMultiSelectFilter } from '../types';

import { ConfigSharedPropertiesSchema } from './config-shared-properties-schema';
import { ParamKeySchema } from './param-key-schema';

export const MultiSelectFilterSchema =
  ConfigSharedPropertiesSchema.append<ConfigMultiSelectFilter>({
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
