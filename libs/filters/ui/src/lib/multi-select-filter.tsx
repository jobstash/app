/* eslint-disable camelcase */
import { type Dispatch, useCallback, useMemo } from 'react';

import { MultiSelect } from '@mantine/core';

import {
  type FilterValue,
  seniorityMapping,
  type SetMultiSelectFilterValueAction,
} from '@jobstash/filters/core';
import { GA_EVENT_ACTION } from '@jobstash/shared/core';
import { cn, gaEvent, normalizeString } from '@jobstash/shared/utils';

import { useIsMobile } from '@jobstash/shared/state';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  value: FilterValue;
  paramKey: string;
  options: string[];
  dispatch: Dispatch<SetMultiSelectFilterValueAction>;
  gaEventName: string | null;
}

const MultiSelectFilter = ({
  label,
  value,
  options,
  paramKey,
  gaEventName,
  dispatch,
}: Props) => {
  const onDropdownClose = () => {
    if (gaEventName && value) {
      gaEvent(GA_EVENT_ACTION.FILTER_ACTION, {
        filter_name: gaEventName,
        filter_value: value,
      });
    }
  };

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
    [dispatch, paramKey],
  );

  const { inputValue, inputLabel } = useMemo(() => {
    const inputValue = value ? value.split(',') : [];
    const inputValueLength = inputValue.length;

    const inputLabel = `${label}${
      inputValueLength > 0 ? ' (' + inputValueLength + ')' : ''
    }`;

    return { inputValue, inputLabel };
  }, [label, value]);

  const isMobile = useIsMobile();
  const hasValue = inputValue.length > 0;

  const data = useMemo(
    () =>
      label === 'Seniority'
        ? Object.keys(seniorityMapping).map((key) => ({
            label: key,
            value: normalizeString(
              seniorityMapping[key as keyof typeof seniorityMapping],
            ) as string,
          }))
        : options.map((option) => ({
            label: option,
            value: normalizeString(option) as string,
          })),
    [label, options],
  );

  return (
    <FilterWrapper label={inputLabel}>
      <MultiSelect
        searchable
        withinPortal
        data={data}
        placeholder="Select"
        classNames={{
          input: cn(
            'rounded-lg border-gray bg-dark text-white placeholder:text-white focus-within:border-white/30',
            { 'border border-white': hasValue },
          ),
          searchInput: 'placeholder-white',
          itemsWrapper: 'bg-dark',
          item: '[&[data-hovered]]:bg-dark-gray [&[data-selected]]:bg-gray lowercase first-letter:uppercase',
          values: cn('overflow-hidden [&>*]:-mr-1', {
            'flex-nowrap': isMobile,
          }),
        }}
        value={inputValue}
        onChange={onChange}
        onDropdownClose={onDropdownClose}
      />
    </FilterWrapper>
  );
};

export default MultiSelectFilter;
