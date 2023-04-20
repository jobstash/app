import { useRouter } from 'next/router';
import { memo, useReducer } from 'react';

import { Collapse, TextInput } from '@mantine/core';

import { Button, FilterIcon, SearchInputIcon } from '~/shared/components';

import { useFilterConfigQuery, useFilters } from '../hooks';
import { createFilterParams } from '../utils';

const Filters = () => {
  const { query, push } = useRouter();

  const [isCollapsed, toggle] = useReducer((p) => !p, true);

  const { data } = useFilterConfigQuery();

  const { filters, filterComponents, sortComponents, clearFilterState } =
    useFilters(data);

  const onClickApply = () => {
    toggle();
    const params = createFilterParams(filters, data);
    const newRoute = `/jobs${params ? '?' + params : ''}`;
    push(newRoute, undefined, { shallow: true });
  };

  const onClickClear = () => {
    clearFilterState();
    toggle();
    push('/jobs', undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col gap-y-2 py-8 pb-4 lg:pb-0">
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
        <div className="flex items-center pt-4 md:absolute">
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
          {/* <div className="-mx-2 flex flex-wrap py-4 lg:-mx-3">
            {sortComponents.map(({ key, ui }) => (
              <div key={key} className="w-1/2 px-2 pb-2 lg:w-1/5 lg:px-3">
                {ui}
              </div>
            ))}

            {filterComponents.map(({ key, ui }) => (
              <div key={key} className="w-1/2 px-2 pb-2 lg:w-1/5 lg:px-3">
                {ui}
              </div>
            ))}
          </div> */}
          <div className="relative py-4">
            <div className="-mx-2 flex flex-wrap pb-4 lg:-mx-3 lg:-mb-4 lg:justify-end">
              {sortComponents.map(({ key, ui }) => (
                <div
                  key={key}
                  className="w-1/2 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
                >
                  {ui}
                </div>
              ))}
            </div>
            <div className="-mx-2 flex flex-wrap lg:-mx-3 lg:-mb-4">
              {filterComponents.map(({ key, ui }) => (
                <div
                  key={key}
                  className="w-1/2 px-2 pb-2 lg:w-1/5 lg:px-3 lg:pb-4"
                >
                  {ui}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 lg:py-4">
            <Button variant="primary" onClick={onClickApply}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={onClickClear}>
              Clear Filters
            </Button>
            <p>{createFilterParams(filters, data)}</p>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(Filters);
