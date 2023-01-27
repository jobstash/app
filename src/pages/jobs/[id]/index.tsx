import { GetServerSideProps } from 'next';

import { faker } from '@faker-js/faker';

import type { JobListing } from '~/core/interfaces';
import RightPanel from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { JobListingUi } from '~/features/unstyled-ui/job-listing-ui';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';
import {
  fakeFirstJobListing,
  generatedFirstJobListing,
} from '~/mocks/faker/fake-first-job-listing';
import {
  fakeJobListings,
  generatedJobListings,
} from '~/mocks/faker/fake-job-listing';

interface Props {
  data: {
    jobListings: JobListing[];
  };
}

const JobPage = ({ data }: Props) => {
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

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  /**
   * Flow:
   * 		1. Receive route params from ctx
   * 		2. Query backend using `id`
   * 				onSuccess:
   * 					- Assume queried `id` is the first element
   * 				onError:
   * 					- 404 Page if not found
   * 					- Error Page if query unsuccessful
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
