import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import type { JobPost } from '~/core/interfaces';
import { JobsFilter } from '~/features/filters/components';
import { JobCardList } from '~/features/jobs/components';
import { RightPanel } from '~/features/right-panel';
import { mockJobPosts } from '~/mocks/data/mock-posts';
import { activePostAtom } from '~/shared/atoms';
import { ToBeReplacedLayout } from '~/shared/components';
import { SideBar } from '~/shared/components/layout/sidebar';

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
      <JobsFilter />
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
