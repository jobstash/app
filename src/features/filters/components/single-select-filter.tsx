import { Dispatch, memo, useCallback, useMemo } from 'react';

import { Select } from '@mantine/core';
import clsx from 'clsx';

import {
  FilterParamKey,
  FilterValue,
  SetSelectFilterValueAction,
} from '../core/types';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  value: FilterValue;
  paramKey: FilterParamKey;
  options: { label: string; value: string }[];
  dispatch: Dispatch<SetSelectFilterValueAction>;
}

const SingleSelectFilter = ({
  label,
  value,
  options,
  paramKey,
  dispatch,
}: Props) => {
  // Use labels in displaying input
  const selections = useMemo(() => options.map((o) => o.label), [options]);
  const inputValue = useMemo(
    () => options.find((o) => o.value.toString() === value)?.label ?? null,
    [options, value],
  );

  const onChange = useCallback(
    (selectedLabel: string) => {
      dispatch({
        type: 'SET_SELECT_FILTER_VALUE',
        payload: { paramKey, selectedLabel, options },
      });
    },
    [options, paramKey, dispatch],
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
