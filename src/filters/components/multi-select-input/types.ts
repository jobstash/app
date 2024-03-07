import { PrimitiveAtom } from 'jotai';

import { MultiSelectFilterConfig } from '~/filters/core/schemas';

export interface MultiSelectInputProps {
  config: MultiSelectFilterConfig;
  paramValue: string;
}
