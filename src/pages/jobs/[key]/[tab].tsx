import type { GetServerSideProps } from 'next';
import { ReactNode, useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { activeJobPostAtom } from '~/features/jobs/atoms';
import { JobCardList } from '~/features/jobs/components';
import { JobPost } from '~/features/jobs/core/interfaces';
import { JobRightPanel } from '~/features/right-panel/components';
import { SideBar } from '~/features/sidebar/components';
import { ERR_INTERNAL } from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

interface Props {
  data: {
    activeListing: JobPost;
  };
}

const JobsPage = ({ data: { activeListing } }: Props) => {
  const setActiveListing = useSetAtom(activeJobPostAtom);

  // Sync SSR data active post
  useEffect(() => {
    setActiveListing(activeListing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <JobCardList initListing={activeListing} />
    </Layout>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const mwURL = process.env['NEXT_PUBLIC_MW_URL'];
  if (!mwURL) {
    sentryMessage('/jobs/{shortUUID} Missing env', 'NEXT_PUBLIC_MW_URL');
    throw new Error(ERR_INTERNAL);
  }

  const shortUUID = ctx.query.key?.slice(-6);
  if (!shortUUID) return { notFound: true };

  const res = await fetch(`${mwURL}/jobs/${shortUUID}`);
  if (!res.ok) return { notFound: true };

  const activeListing = (await res.json()) as JobPost;

  return {
    props: {
      data: {
        activeListing,
      },
    },
  };
};

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="w-full pl-52 pr-[41.67%]">
    <SideBar />

    <div className="px-8">{children}</div>

    <div className="fixed top-0 right-0 z-10 w-5/12">
      <div className="hide-scrollbar sticky top-0 min-h-screen space-y-6 overflow-y-scroll bg-dark p-6">
        <JobRightPanel />
      </div>
    </div>
  </div>
);
