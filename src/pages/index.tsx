import { gql, useQuery } from '@apollo/client';

import { JobListingsQuery } from '~/core/types';

const QUERY_JOB_LISTINGS = gql`
  query JobListings {
    jobs
    companies
    totalCount
  }
`;

const Home = () => {
  const { loading, error, data } =
    useQuery<JobListingsQuery>(QUERY_JOB_LISTINGS);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data returned</p>;

  return (
    <>
      <div>
        <h1 className="pb-4 text-xl">Jobs ({data.totalCount})</h1>

        {data.jobs.map((job) => (
          <div key={job.id} className="pb-2">
            <p>job = {JSON.stringify(job, undefined, 2)}</p>
          </div>
        ))}
      </div>
      <div>
        <h1 className="pb-4 text-xl">Companies:</h1>

        {data.companies.map((company) => (
          <div key={company.id} className="pb-2">
            <p>company = {JSON.stringify(company, undefined, 2)}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
