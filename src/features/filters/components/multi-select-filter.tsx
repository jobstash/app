import { Dispatch, memo, useCallback, useMemo } from 'react';

import { MultiSelect } from '@mantine/core';
import clsx from 'clsx';

import { seniorityMapping } from '../core/constants';
import type {
  FilterParamKey,
  FilterValue,
  SetMultiSelectFilterValueAction,
} from '../core/types';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  value: FilterValue;
  paramKey: FilterParamKey;
  options: string[];
  dispatch: Dispatch<SetMultiSelectFilterValueAction>;
}

const MultiSelectFilter = ({
  label,
  value,
  options,
  paramKey,
  dispatch,
}: Props) => {
  const onChange = useCallback(
    (selectedLabels: string[]) => {
      dispatch({
        type: 'SET_MULTISELECT_FILTER_VALUE',
        payload: {
          selectedLabels,
          paramKey,
        },
      });
    },
    [paramKey, dispatch],
  );

  const { inputValue, inputLabel } = useMemo(() => {
    const inputValue = value ? value.split(',') : [];
    const inputValueLength = inputValue.length;
    const inputLabel = `${label}${
      inputValueLength > 0 ? ' (' + inputValueLength + ')' : ''
    }`;

    return { inputValue, inputLabel };
  }, [label, value]);

  return (
    <FilterWrapper label={inputLabel}>
      <MultiSelect
        searchable
        data={label === 'Seniority' ? Object.keys(seniorityMapping) : options}
        placeholder="Select"
        classNames={{
          input: clsx(
            'rounded-lg border-gray bg-dark text-white placeholder:text-white focus-within:border-white/30',
            { 'border border-white': inputValue.length > 0 },
          ),
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

export default MultiSelectFilter;
