import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { RepoListing } from '~/core/interfaces';
import { RepoCard } from '~/features/repos/components';
import { RightPanel } from '~/features/right-panel';
import { mockRepoListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { SideBar, ToBeReplacedLayout } from '~/shared/components';
import { useRouteSegments } from '~/shared/hooks';
import { slugify } from '~/shared/utils';

interface Props {
  data: {
    listings: RepoListing[];
  };
}

const ReposPage = ({ data }: Props) => {
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

  const onClickListing = (listing: RepoListing) => {
    push(`/repositories/${slugify(listing.details.name)}/details`, {
      shallow: true,
    });
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      {data.listings.map((listing) => (
        <RepoCard
          key={listing.details.id}
          listing={listing}
          isActive={key === slugify(listing.details.name)}
          onClick={() => onClickListing(listing)}
        />
      ))}
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
