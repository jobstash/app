import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { EVENT_CARD_CLICK } from '~/core/constants';
import type { ProjectListing } from '~/core/interfaces';
import { ProjectCard } from '~/features/projects/components';
import { RightPanel } from '~/features/right-panel';
import { mockProjectListings } from '~/mocks/data/mock-listings';
import { activeListingAtom } from '~/shared/atoms';
import { SideBar, ToBeReplacedLayout } from '~/shared/components';
import { useRouteSegments } from '~/shared/hooks';
import { slugify } from '~/shared/utils';

interface Props {
  data: {
    listings: ProjectListing[];
  };
}

const ProjectsPage = ({ data }: Props) => {
  const {
    segments: { key },
    push,
  } = useRouteSegments();
  const [, setActiveListing] = useAtom(activeListingAtom);

  // Sync SSR data active listing
  useEffect(() => {
    setActiveListing(data.listings.length > 0 ? data.listings[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.listings.length === 0) return <h1>EMPTY</h1>;

  const onClickListing = (listing: ProjectListing) => {
    push(`/projects/${slugify(listing.details.name)}/details`, {
      shallow: true,
    });
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  };

  return (
    <ToBeReplacedLayout sidebar={<SideBar />} rightPanel={<RightPanel />}>
      {data.listings.map((listing) => (
        <ProjectCard
          key={listing.details.id}
          listing={listing}
          isActive={key === slugify(listing.details.name)}
          onClick={() => onClickListing(listing)}
        />
      ))}
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
