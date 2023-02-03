import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { Listing } from '~/core/interfaces';
import { ListingCardProject } from '~/features/listing/listing-card-project';
import { RightPanel } from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { Text } from '~/features/unstyled-ui/base/text';
import { useProjectListingQuery } from '~/hooks/use-project-listing-query';
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

const ProjectsPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const { activeListing, setActiveListing } = useRootContext();

  // Set SSR data active listing
  useEffect(() => {
    setActiveListing(data.activeListing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, data: otherListings } = useProjectListingQuery();

  // If for some reason project-listing data is empty, return appropriate page
  if (data.activeListing.projects.length === 0) return <h1>EMPTY</h1>;

  const listingOnClick = (listing: Listing) => {
    push(`/projects/${slugify(listing.projects[0].name)}/details`, {
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
            <ListingCardProject
              key={listing.projects[0].name}
              listing={listing}
              isActive={segments.id === slugify(listing.projects[0].name)}
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
            otherListings.listings.map((listing) => (
              <ListingCardProject
                key={listing.projects[0].name}
                listing={listing}
                isActive={segments.id === slugify(listing.projects[0].name)}
                onClick={() => listingOnClick(listing)}
              />
            ))}
          {/** TODO: FETCH OTHER JOB LISTINGS, SHOW SKELETON WHILE LOADING */}
        </div>
      </GenericLayout>
    </div>
  );
};

export default ProjectsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // !!! [TEMPORARY] redirect users to guaranteed project-lising when using address bar
  if (ctx.query.id !== 'uniswap-uni') {
    return {
      redirect: {
        permanent: false,
        destination: '/projects/uniswap-uni/details',
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
