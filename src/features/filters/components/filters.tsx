import { Button } from '~/shared/components';

import { useFilterConfigQuery, useFilters } from '../hooks';
import { getFilterUrlParams } from '../utils';

type Props = {
  url: string;
};

export const Filters = ({ url }: Props) => {
  const { data, error, isLoading } = useFilterConfigQuery(url);

  const { filters, filterComponents, clearFilters } = useFilters(data);

  if (error)
    return (
      <h1 className="text-white">Error = {JSON.stringify(error.message)}</h1>
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
