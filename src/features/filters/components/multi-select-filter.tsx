import { type Dispatch, memo } from 'react';

import { MultiSelect } from '@mantine/core';

import type { FilterAction, FilterState } from '../core/types';

import { FilterWrapper } from './filter-wrapper';

interface Props {
  options: string[];
  type: keyof FilterState;
  dispatch: Dispatch<FilterAction>;
  value?: string[];
  label?: string;
  placeholder?: string;
}

const _MultiSelectFilter = ({
  options,
  label,
  placeholder,
  value,
  type,
  dispatch,
}: Props) => {
  const onChange = (selectedItems: string[]) => {
    dispatch({
      type,
      payload: selectedItems.length === 0 ? null : new Set(selectedItems),
    });
  };

  return (
    <FilterWrapper label={label}>
      <MultiSelect
        searchable
        value={value}
        data={options}
        placeholder={placeholder ?? 'Select'}
        classNames={{
          input:
            'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
          searchInput: 'placeholder-white',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
          values: 'overflow-hidden flex-nowrap [&>*]:-mr-3',
        }}
        onChange={onChange}
      />
    </FilterWrapper>
  );
};

export const MultiSelectFilter = memo(_MultiSelectFilter);
