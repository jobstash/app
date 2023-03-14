import clsx from 'clsx';
import { useSetAtom } from 'jotai';

import { Button, Text } from '~/shared/components';

import { filterParamsAtom } from '../atoms';
import { useFilterConfigQuery, useFilters } from '../hooks';
import { getFilterUrlParams } from '../utils';

export const Filters = ({
  jobCount,
  isLoadingData,
}: {
  jobCount: number;
  isLoadingData: boolean;
}) => {
  const { data, error, isLoading, isFetching } = useFilterConfigQuery();

  const { filters, filterComponents, sortComponents, clearFilterState } =
    useFilters(data);

  const setFilterParams = useSetAtom(filterParamsAtom);

  if (error)
    return (
      <h1 className="text-white">
        Failed fetching filter-config: {error.message}
      </h1>
    );
  if (isLoading || !data)
    return <h1 className="my-12 text-white">LOADING JOBS FILTER ...</h1>;

  const applyFilter = () => {
    setFilterParams(getFilterUrlParams(filters, data));
  };

  const clear = () => {
    clearFilterState();
    setFilterParams(null);
  };

  const disabledSubmit = Object.keys(filters).length === 0 || isLoadingData;

  return (
    <div
      className={clsx('my-4 text-white', {
        'opacity-40 pointer-events-none': isLoadingData,
      })}
    >
      <div className="flex justify-between">
        <div className="flex min-w-max pl-2 pr-20">
          <div className="mt-3">
            <Text>Filter By</Text>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-2">
          {filterComponents.map(({ key, ui }) => (
            <div key={key} className="my-2">
              {ui}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <div className="flex min-w-max pl-2 pr-20">
          <div className="mt-3">
            <Text>{jobCount > 0 ? `Jobs Listed: ${jobCount}` : 'Loading'}</Text>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-2">
          {sortComponents.map(({ key, ui }) => (
            <div key={key} className="my-2">
              {ui}
            </div>
          ))}

          <Button
            kind="primary"
            isDisabled={disabledSubmit}
            onClick={applyFilter}
          >
            Apply Filters
          </Button>
          <Button isDisabled={disabledSubmit} onClick={clear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
