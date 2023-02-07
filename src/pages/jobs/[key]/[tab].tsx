import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import type { JobListing } from '~/core/interfaces';
import { JobCardList } from '~/features/jobs/components';
import { RightPanel } from '~/features/right-panel';
import { mockJobListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { ToBeReplacedLayout } from '~/shared/components';
import { SideBar } from '~/shared/components/layout/sidebar';

interface Props {
  data: {
    listings: JobListing[];
  };
}

const JobsPage = ({ data }: Props) => {
  const setActiveListing = useSetAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <JobCardList initListings={data.listings} />
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
