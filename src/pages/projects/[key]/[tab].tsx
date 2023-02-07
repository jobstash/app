import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import type { ProjectListing } from '~/core/interfaces';
import { ProjectCardList } from '~/features/projects/components';
import { RightPanel } from '~/features/right-panel';
import { mockProjectListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { SideBar, ToBeReplacedLayout } from '~/shared/components';

interface Props {
  data: {
    listings: ProjectListing[];
  };
}

const ProjectsPage = ({ data }: Props) => {
  const [, setActiveListing] = useAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      <ProjectCardList initListings={data.listings} />
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
        listings: mockProjectListings,
      },
    },
  };
};
