import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { RepoCardList } from '~/features/repos/components';
import { RightPanel } from '~/features/right-panel';
import { mockRepoPosts } from '~/mocks/data/mock-posts';
import { activePostAtom } from '~/shared/atoms';
import { SideBar, ToBeReplacedLayout } from '~/shared/components';
import type { RepoPost } from '~/shared/core/interfaces';

interface Props {
  data: {
    posts: RepoPost[];
  };
}

const ReposPage = ({ data }: Props) => {
  const [, setActiveListing] = useAtom(activePostAtom);

  // Sync SSR data active post
  useEffect(() => {
    setActiveListing(data.posts.length > 0 ? data.posts[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.posts.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <RepoCardList initListings={data.posts} />
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
        posts: mockRepoPosts,
      },
    },
  };
};
