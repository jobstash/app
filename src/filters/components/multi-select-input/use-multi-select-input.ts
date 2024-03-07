import { useState } from 'react';

import { Selection } from '@nextui-org/react';
import { useAtom } from 'jotai';

import { getCountText } from '~/shared/utils/get-count-text';
import { normalizeString } from '~/shared/utils/normalize-string';

import { JOB_SENIORITY_MAP } from '~/jobs/core/constants';
import { useFiltersContext } from '~/filters/providers/filters-provider/context';

import { MultiSelectInputProps } from './types';

export const useMultiSelectInput = (props: MultiSelectInputProps) => {
  const { config, paramValue } = props;
  const { label, paramKey, options: configOptions } = config;

  const isSeniority = paramKey === 'seniority';
  const options = isSeniority ? SENIORITY_OPTIONS : configOptions;

  // Derive original string from normalized values
  const normalizedMap = new Map();
  for (const option of configOptions) {
    normalizedMap.set(normalizeString(option), option);
  }

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

  const [value, setValue] = useState<Selection>(new Set(initValues));

  const { atom } = useFiltersContext();
  const [filterParams, setFilterParams] = useAtom(atom);

  const onSelectionChange = (keys: Selection) => {
    setValue(keys);

    // Map set values into normalized string
    const values = Array.from((keys as Set<string>).values())
      .map((v) => {
        if (paramKey === 'seniority') {
          return JOB_SENIORITY_MAP[v as keyof typeof JOB_SENIORITY_MAP];
        } else {
          return normalizeString(v);
        }
      })
      .filter(Boolean) as string[];

    // Immutable search param
    const newParams = new URLSearchParams(filterParams);

    // With values -> Update filter param
    // Without values -> Clear param
    if (values.length > 0) {
      // TODO: handle seniority
      newParams.set(paramKey, values.join(','));
    } else {
      newParams.delete(paramKey);
    }

    // Save changes
    setFilterParams(newParams);
  };

  const labelText = getCountText(label, (value as Set<string>).size);

  return {
    labelText,
    value,
    onSelectionChange,
    options,
  };
};

// Get values from JOB_SENIORITY_MAP and use corresponding labels as value
// e.g. '2' would be key, and 'Junior' would be the value
const seniorityMap = new Map(
  Object.entries(JOB_SENIORITY_MAP).map(([key, value]) => [value, key]),
);

const SENIORITY_OPTIONS = Array.from(seniorityMap.values());

type SeniorityMapKey =
  (typeof JOB_SENIORITY_MAP)[keyof typeof JOB_SENIORITY_MAP];
