import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { EVENT_CARD_CLICK } from '~/core/constants';
import { JobListing } from '~/core/interfaces';
import { ListingCardJob } from '~/features/listing';
import { RightPanel } from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';
import {
  mockedJobListings,
  mockFirstJobListing,
} from '~/mocks/data/mocked-job-listing';

interface Props {
  data: {
    jobListings: JobListing[];
  };
}

const JobsPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const { activeCards, setActiveJobCard } = useRootContext();

  // Set first element as active job card
  useEffect(() => {
    setActiveJobCard(data.jobListings[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If for some reason jobListings data is empty, return appropriate page
  if (data.jobListings.length === 0) return <h1>EMPTY</h1>;

  const jobOnClick = (jobListing: JobListing) => {
    push(`/jobs/${jobListing.jobs![0].id}/details`, { shallow: true });
    setActiveJobCard(jobListing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  return (
    <div>
      <GenericLayout
        sideBar={
          <SideBar
            section={segments.section}
            push={push}
            activeCards={activeCards}
          />
        }
        rightPanel={<RightPanel segments={segments} push={push} />}
      >
        <div className="flex w-full justify-center py-12">
          <span className="text-2xl font-bold">
            TODO: Search - Filters - Sort
          </span>
        </div>

        <div className="flex w-full flex-col space-y-12">
          {data.jobListings.map((jobListing) => (
            <ListingCardJob
              key={jobListing.jobs![0].id}
              listing={jobListing}
              isActive={segments.id === jobListing.jobs![0].id}
              onClick={() => jobOnClick(jobListing)}
            />
          ))}
        </div>
      </GenericLayout>
    </div>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Use `/jobs/uniswap-labs-senior-frontend-engineer-12345` key
  // if you want to access a job-listing that certainly exists within generated data
  const jobListings = [mockFirstJobListing, ...mockedJobListings];

  const currentJob = jobListings.find(
    (jobListing) => jobListing.jobs![0].id === ctx.query.id,
  );

  if (!currentJob)
    return {
      redirect: {
        permanent: false,
        destination:
          '/jobs/uniswap-labs-senior-frontend-engineer-12345/details',
      },
    };

  return {
    props: {
      data: {
        jobListings,
      },
    },
  };
};
