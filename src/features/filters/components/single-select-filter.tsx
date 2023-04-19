import { type Dispatch, memo } from 'react';

import { Select } from '@mantine/core';
import clsx from 'clsx';

import type { FilterAction, FilterState } from '../core/types';

import { FilterWrapper } from './filter-wrapper';

interface Props {
  value: string;
  options: { value: string; label: string }[];
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
  label?: string;
  placeholder?: string;
}

const _SingleSelectFilter = ({
  value,
  options,
  type,
  dispatch,
  label,
  placeholder,
}: Props) => {
  const onChange = (clickedLabelValue: string) => {
    console.log(
      'clickedLabelValue =',
      clickedLabelValue,
      'value =',
      value,
      'value === clickedLabelValue =',
      value === clickedLabelValue,
    );
    dispatch({
      type,
      payload:
        clickedLabelValue === null
          ? null
          : options.find(({ value }) => value === clickedLabelValue)!.value,
    });
  };

  return (
    <FilterWrapper label={label}>
      <Select
        clearable
        value={value}
        placeholder={placeholder ?? 'Select'}
        data={options}
        classNames={{
          input: clsx(
            'rounded-lg bg-dark text-white placeholder:text-white focus:border-white',
            { 'border-white': value !== undefined && value !== null },
          ),
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
        }}
        onChange={onChange}
      />
    </FilterWrapper>
  );
};

export const SingleSelectFilter = memo(_SingleSelectFilter);
