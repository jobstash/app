import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import type { RepoListing } from '~/core/interfaces';
import { RepoCardList } from '~/features/repos/components';
import { RightPanel } from '~/features/right-panel';
import { mockRepoListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { SideBar, ToBeReplacedLayout } from '~/shared/components';

interface Props {
  data: {
    listings: RepoListing[];
  };
}

const ReposPage = ({ data }: Props) => {
  const [, setActiveListing] = useAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <RepoCardList initListings={data.listings} />
    </ToBeReplacedLayout>
  );
};

export default ReposPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (ctx.query.key !== 'uniswap-interface') {
    return {
      redirect: {
        permanent: false,
        destination: '/repositories/uniswap-interface/details',
      },
    };
  }

  return {
    props: {
      data: {
        listings: mockRepoListings,
      },
    },
  };
};
