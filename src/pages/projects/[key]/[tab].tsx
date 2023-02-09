import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import type { ProjectPost } from '~/core/interfaces';
import { ProjectCardList } from '~/features/projects/components';
import { RightPanel } from '~/features/right-panel';
import { mockProjectPosts } from '~/mocks/data/mock-posts';
import { activePostAtom } from '~/shared/atoms';
import { SideBar, ToBeReplacedLayout } from '~/shared/components';

interface Props {
  data: {
    posts: ProjectPost[];
  };
}

const ProjectsPage = ({ data }: Props) => {
  const [, setActiveListing] = useAtom(activePostAtom);

  // Sync SSR data active post
  useEffect(() => {
    setActiveListing(data.posts.length > 0 ? data.posts[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.posts.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <ProjectCardList initListings={data.posts} />
    </ToBeReplacedLayout>
  );
};

export default ProjectsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  if (ctx.query.key !== 'uniswap-uni') {
    return {
      redirect: {
        permanent: false,
        destination: '/projects/uniswap-uni/details',
      },
    };
  }

  return {
    props: {
      data: {
        posts: mockProjectPosts,
      },
    },
  };
};
