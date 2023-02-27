import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { Filters } from '~/features/filters/components';
import { activeJobPostAtom } from '~/features/jobs/atoms';
import { JobCardList } from '~/features/jobs/components';
import { JobPost } from '~/features/jobs/core/interfaces';
import { fakeJobPost } from '~/features/jobs/testutils';
import { JobRightPanel } from '~/features/right-panel/components';
import { ToBeReplacedLayout } from '~/shared/components';
import { SideBar } from '~/shared/components/layout/sidebar';

interface Props {
  data: {
    listings: JobPost[];
  };
}

const JobsPage = ({ data }: Props) => {
  const setActiveListing = useSetAtom(activeJobPostAtom);

  // Sync SSR data active post
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout
      sidebar={<SideBar />}
      rightPanel={<JobRightPanel listing={data.listings[0]} />}
    >
      <Filters />
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
        listings: [fakeJobPost()],
      },
    },
  };
};
