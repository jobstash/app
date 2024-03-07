import { PrimitiveAtom } from 'jotai';

import { RangeFilterConfig } from '~/filters/core/schemas';

export interface RangeInputProps {
  config: RangeFilterConfig;
  paramValues: { min: number; max: number };
}
