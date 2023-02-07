import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import type { OrgListing } from '~/core/interfaces';
import { OrgCardList } from '~/features/organizations/components';
import { RightPanel } from '~/features/right-panel';
import { mockOrgListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { SideBar } from '~/shared/components';
import { ToBeReplacedLayout } from '~/shared/components';

interface Props {
  data: {
    listings: OrgListing[];
  };
}

const OrganizationsPage = ({ data }: Props) => {
  const [, setActiveListing] = useAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <OrgCardList initListings={data.listings} />
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
