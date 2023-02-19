import { Button } from '~/shared/components';

import { useJobsFilter, useJobsFilterConfigQuery } from '../hooks';
import { getJobsUrlParams } from '../utils';

export const JobsFilter = () => {
  const { data, error, isLoading } = useJobsFilterConfigQuery();

  const { filters, filterComponents } = useJobsFilter(data);

  if (error)
    return (
      <h1 className="text-white">Error = {JSON.stringify(error.message)}</h1>
    );
  if (isLoading || !data)
    return <h1 className="text-white">LOADING JOBS FILTER ...</h1>;

  const applyFilter = () => {
    const urlParams = getJobsUrlParams(filters, data);

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
        <Button onClick={applyFilter}>Apply Filter</Button>
      </div>
    </div>
  );
};
