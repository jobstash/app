import type { GetServerSideProps } from 'next';
import { ReactNode, useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { activeJobPostAtom } from '~/features/jobs/atoms';
import { JobCardList } from '~/features/jobs/components';
import { JobPost } from '~/features/jobs/core/interfaces';
import { fakeJobPost } from '~/features/jobs/testutils';
import { createJobKey } from '~/features/jobs/utils';
import { JobRightPanel } from '~/features/right-panel/components';
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
    <Layout>
      <JobCardList />
    </Layout>
  );
};

export default JobsPage;

const mockPost = fakeJobPost();
const qKey = createJobKey(mockPost);

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (ctx.query.key !== qKey) {
    return {
      redirect: {
        permanent: false,
        destination: `/jobs/${qKey}/details`,
      },
    };
  }

  return {
    props: {
      data: {
        listings: [mockPost],
      },
    },
  };
};

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="w-full pl-52 pr-[41.67%]">
    <SideBar />

    <div className="px-8">{children}</div>

    <div className="fixed top-0 right-0 z-10 w-5/12">
      <div className="hide-scrollbar sticky top-0 min-h-screen space-y-6 overflow-y-scroll bg-white/5 p-6">
        <JobRightPanel />
      </div>
    </div>
  </div>
);
