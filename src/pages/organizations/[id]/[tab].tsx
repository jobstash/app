import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { Listing } from '~/core/interfaces';
import { ListingCardOrg } from '~/features/listing/listing-card-org';
import { RightPanel } from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';
import { mockGuaranteedListing } from '~/mocks/data/mocked-guaranteed-listing';
import { slugify } from '~/utils/slugify';

interface Props {
  data: {
    activeListing: Listing;
  };
}

const JobsPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const { activeListing, setActiveListing } = useRootContext();

  // Set SSR data active listing
  useEffect(() => {
    setActiveListing(data.activeListing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If for some reason jobListings data is empty, return appropriate page
  if (data.activeListing.jobs.length === 0) return <h1>EMPTY</h1>;

  const listingOnClick = (listing: Listing) => {
    push(`/organizations/${slugify(listing.org.name)}/details`, {
      shallow: true,
    });
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
          {[data.activeListing].map((listing) => (
            <ListingCardOrg
              key={listing.org.name}
              listing={listing}
              isActive={segments.id === slugify(listing.org.name)}
              onClick={() => listingOnClick(listing)}
            />
          ))}
          {/** TODO: FETCH OTHER JOB LISTINGS, SHOW SKELETON WHILE LOADING */}
        </div>
      </GenericLayout>
    </div>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    data: {
      // Guaranteed `/organizations/uniswap-labs/details` route
      activeListing: mockGuaranteedListing,
    },
  },
});
