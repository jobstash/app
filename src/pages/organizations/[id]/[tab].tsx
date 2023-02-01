import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { EVENT_CARD_CLICK } from '~/core/constants';
import { OrgListing } from '~/core/interfaces';
import { ListingCardOrg } from '~/features/listing/listing-card-org';
import { RightPanel } from '~/features/right-panel';
import { SideBar } from '~/features/sidebar';
import { useRootContext } from '~/hooks/use-root-context';
import { useRouteSegments } from '~/hooks/use-route-segments';
import { GenericLayout } from '~/layouts/generic-layout';
import { mockOrgListings } from '~/mocks/data/mocked-org-listing';
import { slugify } from '~/utils/slugify';

interface PageProps {
  data: {
    listings: OrgListing[];
  };
}

const OrgsPage = ({ data }: PageProps) => {
  const { segments, push } = useRouteSegments();
  const { activeCards, setActiveOrgCard } = useRootContext();

  // Set first element as active job card
  useEffect(() => {
    setActiveOrgCard(data.listings[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If for some reason jobListings data is empty, return appropriate page
  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  const cardOnClick = (listing: OrgListing) => {
    push(`/organizations/${slugify(listing.org.name)}/details`, {
      shallow: true,
    });
    setActiveOrgCard(listing);
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
          {data.listings.map((listing) => (
            <ListingCardOrg
              key={listing.org.name}
              listing={listing}
              isActive={segments.id === slugify(listing.org.name)}
              onClick={() => cardOnClick(listing)}
            />
          ))}
        </div>
      </GenericLayout>
    </div>
  );
};

export default OrgsPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx,
) => {
  // Use `/organizations/uniswap-labs/details` key
  // if you want to access a job-listing that certainly exists within generated data
  const listings = mockOrgListings;

  // ActiveListing is the listing that matches the url query
  const activeListing = listings.find(
    (listings) => slugify(listings.org.name) === ctx.query.id,
  );

  // !!! Note: TEMPORARY TO AVOID 404 during dev
  if (!activeListing)
    return {
      redirect: {
        permanent: false,
        destination: '/organizations/uniswap-labs/details',
      },
    };

  return {
    props: {
      data: {
        listings,
      },
    },
  };
};
