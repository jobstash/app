import { type Dispatch, useCallback, useMemo } from 'react';

import { MultiSelect } from '@mantine/core';

import {
  type FilterValue,
  seniorityMapping,
  type SetMultiSelectFilterValueAction,
} from '@jobstash/filters/core';
import { cn, decodeBase64 } from '@jobstash/shared/utils';

import FilterWrapper from './filter-wrapper';

interface Props {
  label: string;
  value: FilterValue;
  paramKey: string;
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
    let inputValue = value ? value.split(',').map((v) => decodeBase64(v)) : [];
    const inputValueLength = inputValue.length;

    if (label === 'Seniority') {
      const newInputValue = [];

      for (const seniorityValue of inputValue) {
        newInputValue.push(
          Object.keys(seniorityMapping).find(
            (key) =>
              seniorityMapping[key as keyof typeof seniorityMapping] ===
              seniorityValue,
          ) as string,
        );
      }

      inputValue = newInputValue;
    }

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
          input: cn(
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
