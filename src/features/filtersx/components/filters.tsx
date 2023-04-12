import { useRouter } from 'next/router';

import { Collapse, TextInput } from '@mantine/core';

import { Button, FilterIcon, SearchInputIcon, Text } from '~/shared/components';

import { useFilterConfigQuery, useFilters } from '../hooks';
import { createFilterParams } from '../utils';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export const Filters = ({ isOpen, toggle }: Props) => {
  const { query, push } = useRouter();
  const baseRoute = `/jobs/${query.key}/${query.tab}`;

  const { data, error, isLoading, isFetching } = useFilterConfigQuery();

  const { filters, filterComponents, sortComponents, clearFilterState } =
    useFilters(data);

  const onClickApply = () => {
    const params = createFilterParams(filters, data);
    const newRoute = `${baseRoute}${params ? '?' + params : ''}`;
    push(newRoute, undefined, { shallow: true });
    toggle();
  };

  const onClickClear = () => {
    clearFilterState();
    push(baseRoute, undefined, { shallow: true });
    toggle();
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
        />
      </div>

      <div className="relative min-h-[70px]">
        <div className="absolute flex items-center pt-4">
          <Button
            variant="outline"
            isActive={isOpen}
            left={<FilterIcon />}
            onClick={toggle}
          >
            Filters & Sorting
          </Button>
        </div>

        <Collapse
          in={isOpen}
          transitionDuration={350}
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

          <div className="flex flex-wrap gap-6 py-5">
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

      <div>
        <Text color="dimmed">Jobs Listed: TBD</Text>
      </div>
    </div>
  );
};
