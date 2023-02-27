import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { Filters } from '~/features/filters/components';
import { API_URL_JOBS_FILTER_CONFIG } from '~/features/filters/core/constants';
import { JobCardList } from '~/features/jobs/components';
import { RightPanel } from '~/features/right-panel';
import { mockJobPosts } from '~/mocks/data/mock-posts';
import { activePostAtom } from '~/shared/atoms';
import { ToBeReplacedLayout } from '~/shared/components';
import { SideBar } from '~/shared/components/layout/sidebar';
import type { JobPost } from '~/shared/core/interfaces';

interface Props {
  data: {
    posts: JobPost[];
  };
}

const JobsPage = ({ data }: Props) => {
  const setActiveListing = useSetAtom(activePostAtom);

  // Sync SSR data active post
  useEffect(() => {
    setActiveListing(data.posts.length > 0 ? data.posts[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.posts.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <Filters url={API_URL_JOBS_FILTER_CONFIG} />
      <JobCardList initListings={data.posts} />
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
        posts: mockJobPosts,
      },
    },
  };
};
