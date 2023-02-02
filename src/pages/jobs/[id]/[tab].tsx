import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { Listing } from '~/core/interfaces';
import { ListingCardJob } from '~/features/listing';
import { RightPanel } from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { Text } from '~/features/unstyled-ui/base/text';
import { useJobListingQuery } from '~/hooks/use-job-listing-query';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';
import { mockGuaranteedListing } from '~/mocks/data/mocked-guaranteed-listing';

interface Props {
  data: {
    activeListing: Listing;
  };
}

const JobsPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const { activeListing, setActiveListing } = useRootContext();

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.activeListing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, data: otherListings } = useJobListingQuery();

  // If for some reason jobListings data is empty, return appropriate page
  if (data.activeListing.jobs.length === 0) return <h1>EMPTY</h1>;

  const listingOnClick = (listing: Listing) => {
    push(`/jobs/${listing.jobs[0].id}/details`, { shallow: true });
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  return (
    <div>
      <GenericLayout
        sideBar={
          <SideBar
            section={segments.section}
            push={push}
            listing={activeListing}
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
          <ListingCardJob
            key={data.activeListing.jobs[0].id}
            listing={data.activeListing}
            isActive={segments.id === data.activeListing.jobs[0].id}
            onClick={() => listingOnClick(data.activeListing)}
          />
          {isLoading && (
            <div className="flex flex-col space-y-4">
              <Text size="2xl">Loading other listings (fake 2sec delay)</Text>
              <Text size="xl">TODO: {'<ListingsSkeleton />'} component</Text>
            </div>
          )}
          {otherListings &&
            otherListings.listings.map((listing) => (
              <ListingCardJob
                key={listing.jobs[0].id}
                listing={listing}
                isActive={segments.id === listing.jobs[0].id}
                onClick={() => listingOnClick(listing)}
              />
            ))}
        </div>
      </GenericLayout>
    </div>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // !!! [TEMPORARY] redirect users to guaranteed job-lising when using address bar
  if (ctx.query.id !== 'uniswap-labs-senior-frontend-engineer-12345') {
    return {
      redirect: {
        permanent: false,
        destination:
          '/jobs/uniswap-labs-senior-frontend-engineer-12345/details',
      },
    };
  }

  return {
    props: {
      data: {
        // Guaranteed `/jobs/uniswap-labs-senior-frontend-engineer-12345/details` route
        activeListing: mockGuaranteedListing,
      },
    },
  };
};
