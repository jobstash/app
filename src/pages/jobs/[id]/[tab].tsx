import { GetServerSideProps } from 'next';

import { JobListing } from '~/core/interfaces';
import RightPanel from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { JobListingUi } from '~/features/unstyled-ui/job-listing-ui';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';
import { generatedFirstJobListing } from '~/mocks/faker/fake-first-job-listing';
import { generatedJobListings } from '~/mocks/faker/fake-job-listing';

interface Props {
  data: {
    jobListings: JobListing[];
  };
}

const JobsPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const { activeIds, setActiveJobId } = useRootContext();

  // * If for some reason key is not a string or is undefined, we render 404
  if (typeof segments.id !== 'string' || !segments.id)
    return <h1>Custom 404 Page</h1>;

  // * If for some reason tab is not a string nor undefined, we render 404
  if (typeof segments.tab !== 'string' && segments.tab !== undefined)
    return <h1>Custom 404 Page</h1>;

  const jobOnClick = (id: string) => {
    push(id, { shallow: true });
    setActiveJobId(id);
  };

  return (
    <div>
      <GenericLayout
        sideBar={
          <SideBar
            section={segments.section}
            push={push}
            activeIds={activeIds}
          />
        }
        rightPanel={
          <RightPanel
            section={segments.section}
            idSegment={segments.id}
            tabSegment={segments.tab}
            push={push}
          />
        }
      >
        <div className="flex w-full justify-center py-12">
          <span className="text-2xl font-bold">
            TODO: Search - Filters - Sort
          </span>
        </div>

        <div className="flex flex-col space-y-12">
          {data.jobListings.map((jobListing) => (
            <JobListingUi
              key={jobListing.job.id}
              jobListing={jobListing}
              isActive={segments.id === jobListing.job.id}
              onClick={() => jobOnClick(jobListing.job.id)}
            />
          ))}
        </div>
      </GenericLayout>
    </div>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /**
   * Possible Scenarios:
   * 		1. Url was directly accessed by users.
   * 				- Manual entry in browser
   * 				- Shared links / Backlinks
   * 		2. Routed from landing page
   * 				- Redirected
   * Questions:
   * 		- What would be the basis for selecting first job?
   * 			- Direct access:
   * 				- ? make use of `id` in url `{org}-{job-title} to fetch first + related jobs
   * 			- From landing page:
   * 				- The job `id` should probably be determined before redirection
   * 				- ? Maybe just fetch data from server then first element = selected job
   * 		- Logged in users might have preference on the jobs returned?
   */

  /**
   * Since we're using dummy data, here are the assumptions made:
   * 		- job `id` is in `{org}-{job-title}` format
   * 		- requested job `id` exists in backend
   * 		- conflicting job `id` is handled in backend:
   * 			- e.g. for same org looking for 2 or more jobs with same role
   * 		- backend returns the job for requested `id` as first element
   * 		- all data are ready to be rendered (filtering/calculations are done in backend)
   * 			- job `created` is a string formatted from backend
   * 			- job `dateFunding` is a string formatted from backend
   * 			- `totalCount` is calculated in backend
   */

  // Use `/jobs/uniswap-labs-senior-frontend-engineer-12345` key
  // if you want to access a job-listing that certainly exists within generated data
  const jobListings = [generatedFirstJobListing, ...generatedJobListings];

  const currentJob = jobListings.find(
    (jobListing) => jobListing.job.id === ctx.query.id,
  );

  if (!currentJob) {
    console.log('TRIES TO ACCESS =', ctx.resolvedUrl);
    return { redirect: { permanent: false, destination: '/404' } };
  }

  return {
    props: {
      data: {
        jobListings,
      },
    },
  };
};
