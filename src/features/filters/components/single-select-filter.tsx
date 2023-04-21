import { memo, useCallback, useMemo } from 'react';

import { Select } from '@mantine/core';
import clsx from 'clsx';

import type { SetFilterValueEvent } from '../core/types';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  value: string | null;
  options: { label: string; value: string }[];
  paramKey: string;
  send: (_: SetFilterValueEvent) => void;
}

const SingleSelectFilter = ({
  label,
  value,
  options,
  paramKey,
  send,
}: Props) => {
  const selections = useMemo(() => options.map((o) => o.label), [options]);

  const inputValue = useMemo(
    () => options.find((o) => o.value.toString() === value)?.label ?? null,
    [options, value],
  );

  const onChange = useCallback(
    (selectedLabel: string) => {
      const payload =
        options.find((o) => o.label === selectedLabel)?.value.toString() ??
        null;
      send({ type: 'SET_FILTER_VALUE', payload, paramKey });
    },
    [options, paramKey, send],
  );

  return (
    <FilterWrapper label={label}>
      <Select
        clearable
        placeholder="Select"
        data={selections}
        classNames={{
          input: clsx(
            'rounded-lg bg-dark text-white placeholder:text-white focus:border-white',
          ),
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
        }}
        value={inputValue}
        onChange={onChange}
      />
    </FilterWrapper>
  );
};

export default memo(SingleSelectFilter);
