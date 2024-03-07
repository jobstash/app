'use client';

import { useState } from 'react';

import { Selection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { useAtom } from 'jotai';

import { getCountText } from '~/shared/utils/get-count-text';
import { normalizeString } from '~/shared/utils/normalize-string';

import { MultiSelectFilterConfig } from '~/filters/core/schemas';
import { JOB_SENIORITY_MAP } from '~/jobs/core/constants';
import { jobFiltersSearchParamsAtom } from '~/jobs/atoms/job-filters-search-params-atom';

interface Props {
  initValues: string[];
  config: MultiSelectFilterConfig;
  overrideOptions?: string[];
}

export const MultiSelectInput = (props: Props) => {
  const { config, initValues, overrideOptions } = props;
  const { label, options, paramKey } = config;

  const [value, setValue] = useState<Selection>(new Set(initValues));

  const [jobFilterParams, setJobFilterParams] = useAtom(
    jobFiltersSearchParamsAtom,
  );

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
    const newParams = new URLSearchParams(jobFilterParams);

    // With values -> Update filter param
    // Without values -> Clear param
    if (values.length > 0) {
      // TODO: handle seniority
      newParams.set(paramKey, values.join(','));
    } else {
      newParams.delete(paramKey);
    }

    // Save changes
    setJobFilterParams(newParams);
  };

  const labelText = getCountText(label, (value as Set<string>).size);

  return (
    <Select
      size="sm"
      label={labelText}
      selectionMode="multiple"
      classNames={{
        trigger: 'bg-darkest-gray',
      }}
      selectedKeys={value}
      onSelectionChange={onSelectionChange}
    >
      {(overrideOptions ?? options).map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};
