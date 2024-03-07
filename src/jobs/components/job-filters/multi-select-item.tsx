import { normalizeString } from '~/shared/utils/normalize-string';

import { MultiSelectFilterConfig } from '~/filters/core/schemas';
import { JOB_SENIORITY_MAP } from '~/jobs/core/constants';

import { MultiSelectInput } from './multi-select-input';

interface Props {
  config: MultiSelectFilterConfig;
  urlFilterParams: URLSearchParams;
}

// Convenience for select input component not to rerender on route change
// Rerender occurs when using useSearchParams hook which listens to router
// Selecting jobs always changes the route - so use SSR params value instead
export const MultiSelectItem = ({ config, urlFilterParams }: Props) => {
  const { paramKey, options } = config;
  const isSeniority = paramKey === 'seniority';

  // Derive original string from normalized values
  const normalizedMap = new Map();
  for (const option of options) {
    normalizedMap.set(normalizeString(option), option);
  }

  const paramValue = urlFilterParams.get(paramKey) ?? '';
  const paramValues = paramValue.split(',');

  const initValues: string[] = [];
  for (const v of paramValues) {
    // Handle seniority mapping - otherwise do normalized mapping
    if (isSeniority) {
      const value = seniorityMap.get(v as SeniorityMapKey);
      if (value) {
        initValues.push(value);
      }
    } else if (normalizedMap.has(v)) {
      initValues.push(normalizedMap.get(v));
    }
  }

  return (
    <MultiSelectInput
      initValues={initValues}
      config={config}
      overrideOptions={isSeniority ? SENIORITY_OPTIONS : undefined}
    />
  );
};

// Get values from JOB_SENIORITY_MAP and use corresponding labels as value
// e.g. '2' would be key, and 'Junior' would be the value
const seniorityMap = new Map(
  Object.entries(JOB_SENIORITY_MAP).map(([key, value]) => [value, key]),
);

const SENIORITY_OPTIONS = Array.from(seniorityMap.values());

type SeniorityMapKey =
  (typeof JOB_SENIORITY_MAP)[keyof typeof JOB_SENIORITY_MAP];
