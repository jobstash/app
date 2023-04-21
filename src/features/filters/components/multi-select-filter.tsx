import { memo, useCallback, useMemo } from 'react';

import { MultiSelect } from '@mantine/core';

import type { SetFilterValueEvent } from '../core/types';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  value: string | null;
  options: string[];
  paramKey: string;
  send: (_: SetFilterValueEvent) => void;
}

const MultiSelectFilter = ({
  label,
  value,
  options,
  paramKey,
  send,
}: Props) => {
  const onChange = useCallback(
    (selected: string[]) => {
      console.log('selected =', selected);
      send({
        type: 'SET_FILTER_VALUE',
        paramKey,
        payload: selected.length > 0 ? selected.join(',') : null,
      });
    },
    [paramKey, send],
  );

  const inputValue = value?.split(',');

  return (
    <FilterWrapper label={label}>
      <MultiSelect
        searchable
        data={options}
        placeholder="Select"
        classNames={{
          input:
            'bg-dark rounded-lg border-gray text-white placeholder-white focus-within:border-white/30',
          searchInput: 'placeholder-white',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray',
          values: 'overflow-hidden flex-nowrap [&>*]:-mr-3',
        }}
        //
        // value={['move', 'Rust']}
        value={inputValue}
        onChange={onChange}
      />
    </FilterWrapper>
  );
};

export default memo(MultiSelectFilter);
