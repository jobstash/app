import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { JobListing } from '~/core/interfaces';
import { JobCard } from '~/features/jobs/components';
import { checkJobIsActive, createJobKey } from '~/features/jobs/utils';
import { RightPanel } from '~/features/right-panel';
import { mockJobListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { ToBeReplacedLayout } from '~/shared/components';
import { SideBar } from '~/shared/components/layout/sidebar';
import { useRouteSegments } from '~/shared/hooks';

interface Props {
  data: {
    listings: JobListing[];
  };
}

const JobsPage = ({ data }: Props) => {
  const { segments, push } = useRouteSegments();
  const [, setActiveListing] = useAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  const onClickListing = (listing: JobListing) => {
    push(`/jobs/${createJobKey(listing)}/details`, { shallow: true });
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      {data.listings.map((listing) => (
        <JobCard
          key={listing.details.id}
          listing={listing}
          isActive={checkJobIsActive(segments.key, listing)}
          onClick={() => onClickListing(listing)}
        />
      ))}
    </ToBeReplacedLayout>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (ctx.query.key !== 'uniswap-labs-senior-frontend-engineer-12345') {
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
        listings: mockJobListings,
      },
    },
  };
};
