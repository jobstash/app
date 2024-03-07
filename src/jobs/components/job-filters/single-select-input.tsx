'use client';

import { ChangeEventHandler, useState } from 'react';

import { Select, SelectItem } from '@nextui-org/select';
import { useAtom } from 'jotai';

import { SingleSelectFilterConfig } from '~/filters/core/schemas';
import { jobFiltersSearchParamsAtom } from '~/jobs/atoms/job-filters-search-params-atom';

interface Props {
  initValue: string;
  config: SingleSelectFilterConfig;
}

export const SingleSelectInput = ({ initValue, config }: Props) => {
  const { label, options, paramKey } = config;

  const [value, setValue] = useState(initValue);
  const selectedKeys = value ? [value] : [];

  const [jobFilterParams, setJobFilterParams] = useAtom(
    jobFiltersSearchParamsAtom,
  );

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Map selected to config option
    const option = options.find((option) => option.label === inputValue);

    // Immutable search param
    const newParams = new URLSearchParams(jobFilterParams);

    // Select -> Update filter param
    // Unselect -> Clear param
    option?.value
      ? newParams.set(paramKey, option.value.toString())
      : newParams.delete(paramKey);

    // Save changes
    setJobFilterParams(newParams);
  };

  return (
    <Select
      size="sm"
      label={label}
      classNames={{
        trigger: 'bg-darkest-gray',
      }}
      selectedKeys={selectedKeys}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <SelectItem key={label} value={value.toString()}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};
