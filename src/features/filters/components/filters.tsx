import { useSetAtom } from 'jotai';

import { Button } from '~/shared/components';

import { filterParamsAtom } from '../atoms';
import { useFilterConfigQuery, useFilters } from '../hooks';
import { getFilterUrlParams } from '../utils';

export const Filters = () => {
  const { data, error, isLoading } = useFilterConfigQuery();

  const { filters, filterComponents, clearFilterState } = useFilters(data);

  const setFilterParams = useSetAtom(filterParamsAtom);

  if (error)
    return (
      <h1 className="text-white">
        Failed fetching filter-config: {error.message}
      </h1>
    );
  if (isLoading || !data)
    return <h1 className="text-white">LOADING JOBS FILTER ...</h1>;

  const applyFilter = () => {
    setFilterParams(getFilterUrlParams(filters, data));
  };

  const clear = () => {
    clearFilterState();
    setFilterParams(null);
  };

  const disabledSubmit = Object.keys(filters).length === 0;

  return (
    <div className="text-white">
      <div className="flex flex-wrap items-center gap-x-2">
        {filterComponents.map(({ key, ui }) => (
          <div key={key} className="my-2">
            {ui}
          </div>
        ))}
        <Button
          kind="primary"
          isDisabled={disabledSubmit}
          onClick={applyFilter}
        >
          Apply Filter
        </Button>
        <Button isDisabled={disabledSubmit} onClick={clear}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
