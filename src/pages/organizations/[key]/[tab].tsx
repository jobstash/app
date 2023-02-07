import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { OrgListing } from '~/core/interfaces';
import { OrgCard } from '~/features/organizations/components';
import { RightPanel } from '~/features/right-panel';
import { mockOrgListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { SideBar } from '~/shared/components';
import { ToBeReplacedLayout } from '~/shared/components';
import { useRouteSegments } from '~/shared/hooks';
import { slugify } from '~/shared/utils';

interface Props {
  data: {
    listings: OrgListing[];
  };
}

const OrganizationsPage = ({ data }: Props) => {
  const {
    segments: { key },
    push,
  } = useRouteSegments();
  const [, setActiveListing] = useAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  const onClickListing = (listing: OrgListing) => {
    push(`/organizations/${slugify(listing.details.name)}/details`, {
      shallow: true,
    });
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      {data.listings.map((listing) => (
        <OrgCard
          key={listing.details.id}
          listing={listing}
          isActive={key === slugify(listing.details.name)}
          onClick={() => onClickListing(listing)}
        />
      ))}
    </ToBeReplacedLayout>
  );
};

export default OrganizationsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (ctx.query.key !== 'uniswap-labs') {
    return {
      redirect: {
        permanent: false,
        destination: '/organizations/uniswap-labs/details',
      },
    };
  }

  return {
    props: {
      data: {
        listings: mockOrgListings,
      },
    },
  };
};
