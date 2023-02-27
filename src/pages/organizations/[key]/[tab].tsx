import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { OrgCardList } from '~/features/organizations/components';
import { RightPanel } from '~/features/right-panel';
import { mockOrgPosts } from '~/mocks/data/mock-posts';
import { activePostAtom } from '~/shared/atoms';
import { SideBar } from '~/shared/components';
import { ToBeReplacedLayout } from '~/shared/components';
import type { OrgPost } from '~/shared/core/interfaces';

interface Props {
  data: {
    posts: OrgPost[];
  };
}

const OrganizationsPage = ({ data }: Props) => {
  const [, setActiveListing] = useAtom(activePostAtom);

  // Sync SSR data active post
  useEffect(() => {
    setActiveListing(data.posts.length > 0 ? data.posts[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.posts.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <OrgCardList initListings={data.posts} />
    </ToBeReplacedLayout>
  );
};

export default OrganizationsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (ctx.query.key !== 'uniswap-labs') {
    return {
      redirect: {
        permanent: false,
        destination: '/organizations/uniswap-labs/details',
      },
    };
  }

  return {
    props: {
      data: {
        posts: mockOrgPosts,
      },
    },
  };
};
