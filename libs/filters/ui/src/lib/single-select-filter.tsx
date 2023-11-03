/* eslint-disable camelcase */
import { type Dispatch, memo, useCallback, useMemo } from 'react';

import { Select } from '@mantine/core';

import {
  type FilterValue,
  type SelectOptions,
  type SetSelectFilterValueAction,
} from '@jobstash/filters/core';
import { GA_EVENT_ACTION } from '@jobstash/shared/core';
import { cn, gaEvent } from '@jobstash/shared/utils';

import FilterWrapper from './filter-wrapper';

interface Props {
  value: FilterValue;
  paramKey: string;
  options: SelectOptions;
  dispatch: Dispatch<SetSelectFilterValueAction>;
  gaEventName: string | null;
  label?: string;
  placeholder?: string;
}

const SingleSelectFilter = ({
  value,
  options,
  paramKey,
  dispatch,
  label,
  placeholder,
  gaEventName,
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

      if (gaEventName) {
        gaEvent(GA_EVENT_ACTION.FILTER_ACTION, {
          filter_name: gaEventName,
          filter_value: selectedLabel,
        });
      }
    },
    [dispatch, paramKey, options, gaEventName],
  );

  return (
    <FilterWrapper label={label}>
      <Select
        clearable
        withinPortal
        placeholder={placeholder ?? 'Select'}
        data={selections}
        classNames={{
          input: cn(
            'rounded-lg bg-dark text-white placeholder:text-white focus:border-white',
            { 'border border-white': Boolean(inputValue) },
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
