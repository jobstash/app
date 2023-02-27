import { Button } from '~/shared/components';

import { useFilterConfigQuery, useFilters } from '../hooks';
import { getFilterUrlParams } from '../utils';

export const Filters = () => {
  const { data, error, isLoading } = useFilterConfigQuery();

  const { filters, filterComponents, clearFilters } = useFilters(data);

  if (error)
    return (
      <h1 className="text-white">
        Failed fetching filter-config: {error.message}
      </h1>
    );
  if (isLoading || !data)
    return <h1 className="text-white">LOADING JOBS FILTER ...</h1>;

  const applyFilter = () => {
    const urlParams = getFilterUrlParams(filters, data);

    // eslint-disable-next-line no-alert
    alert(urlParams ? `/jobs/list?${urlParams}` : 'EMPTY FILTER');
  };

  return (
    <div className="text-white">
      <div className="flex flex-wrap items-center gap-x-2">
        {filterComponents.map(({ key, ui }) => (
          <div key={key} className="my-2">
            {ui}
          </div>
        ))}
        <Button kind="primary" onClick={applyFilter}>
          Apply Filter
        </Button>
        <Button onClick={clearFilters}>Clear All Filters</Button>
      </div>
    </div>
  );
};
