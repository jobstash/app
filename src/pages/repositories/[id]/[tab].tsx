import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { EVENT_CARD_CLICK } from '~/core/constants';
import { Listing } from '~/core/interfaces';
import { ListingCardRepo } from '~/features/listing/listing-card-repo';
import { RightPanel } from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { Text } from '~/features/unstyled-ui/base/text';
import { useRepoListingQuery } from '~/hooks/use-repo-listing-query';
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

const RepositoriesPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const { activeListing, setActiveListing } = useRootContext();

  // Set SSR data active listing
  useEffect(() => {
    setActiveListing(data.activeListing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, data: otherListings } = useRepoListingQuery();

  // If for some reason repo-listing data is empty, return appropriate page
  if (data.activeListing.projects.length === 0) return <h1>EMPTY</h1>;

  const listingOnClick = (listing: Listing) => {
    push(`/repositories/${slugify(listing.repositories[0].name)}/details`, {
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
        // RightPanel={null}
      >
        <div className="flex w-full justify-center py-12">
          <span className="text-2xl font-bold">
            TODO: Search - Filters - Sort
          </span>
        </div>

        <div className="flex w-full flex-col space-y-12">
          {[data.activeListing].map((listing) => (
            <ListingCardRepo
              key={listing.repositories[0].name}
              listing={listing}
              isActive={segments.id === slugify(listing.repositories[0].name)}
              onClick={() => listingOnClick(listing)}
            />
          ))}
          {isLoading && (
            <div className="flex flex-col space-y-4">
              <Text size="2xl">Loading other listings (fake 2sec delay)</Text>
              <Text size="xl">TODO: {'<ListingsSkeleton />'} component</Text>
            </div>
          )}
          {otherListings &&
            otherListings.listings.map(
              (listing) =>
                listing.repositories.length > 0 && (
                  <ListingCardRepo
                    key={listing.repositories[0].name}
                    listing={listing}
                    isActive={
                      segments.id === slugify(listing.repositories[0].name)
                    }
                    onClick={() => listingOnClick(listing)}
                  />
                ),
            )}
          {/** TODO: FETCH OTHER JOB LISTINGS, SHOW SKELETON WHILE LOADING */}
        </div>
      </GenericLayout>
    </div>
  );
};

export default RepositoriesPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // !!! [TEMPORARY] redirect users to guaranteed project-lising when using address bar
  if (ctx.query.id !== 'uniswap-core-v3') {
    return {
      redirect: {
        permanent: false,
        destination: '/repositories/uniswap-core-v3/details',
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
