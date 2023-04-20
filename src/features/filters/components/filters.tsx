import { memo, useReducer } from 'react';

import { Collapse, TextInput } from '@mantine/core';

import { Button, FilterIcon, SearchInputIcon } from '~/shared/components';

import { useFilterConfigQuery, useFilters, useUrlFilterParams } from '../hooks';
import { createAppliedFilterUrl } from '../utils';

const Filters = () => {
  const { push, filterParamsObj } = useUrlFilterParams();
  const [isCollapsed, toggle] = useReducer((p) => !p, true);

  const { data } = useFilterConfigQuery();

  const { filters, filterComponents, sortComponents, clearFilterState } =
    useFilters(data);

  const onClickApply = () => {
    toggle();
    const url = createAppliedFilterUrl(filters, filterParamsObj, data);
    push(url, undefined, { shallow: true });
  };

  const onClickClear = () => {
    clearFilterState();
    toggle();
    push('/jobs', undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col gap-y-2 py-8 pb-4">
      <div>
        <TextInput
          icon={<SearchInputIcon />}
          placeholder="Search Jobs"
          size="lg"
          radius="md"
          //
          styles={{
            input: {
              background: 'rgba(255, 255, 255, 0.1)',
              fontSize: 16,
              border: 'transparent',
            },
          }}
          disabled={!data}
        />
      </div>

      <div className="relative min-h-[70px]">
        <div className="absolute flex items-center pt-4">
          <Button
            variant="outline"
            isActive={!isCollapsed}
            left={<FilterIcon />}
            isDisabled={!data}
            onClick={toggle}
          >
            Filters & Sorting
          </Button>
        </div>

        <Collapse
          in={!isCollapsed}
          transitionDuration={200}
          transitionTimingFunction="linear"
        >
          <div className="grid grid-cols-5 items-end gap-8 py-4">
            <div />
            <div />
            <div />
            {sortComponents.map(({ key, ui }) => (
              <div key={key}>{ui}</div>
            ))}

            {filterComponents.map(({ key, ui }) => (
              <div key={key}>{ui}</div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 pt-5">
            <Button variant="primary" onClick={onClickApply}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={onClickClear}>
              Clear Filters
            </Button>
            <p>{JSON.stringify(filterParamsObj)}</p>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(Filters);
