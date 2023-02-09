import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_PROJECTS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/core/constants';
import type { ProjectListing } from '~/core/interfaces';
import { activeListingAtom } from '~/shared/atoms';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString, slugify } from '~/shared/utils';

import { useProjectListingInfQuery } from '../hooks';

import { ProjectCard } from './project-card';

interface Props {
  initListings: ProjectListing[];
}

export const ProjectCardList = ({ initListings }: Props) => {
  const {
    segments: { key },
    push,
  } = useRouteSegments();
  const setActiveListing = useSetAtom(activeListingAtom);

  const onClickListing = (listing: ProjectListing) => {
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    const route = createRouteString(
      TEXT_ROUTE_SECTION_PROJECTS,
      slugify(listing.details.name),
      TEXT_ROUTE_TAB_DETAILS,
    );

    push(route, {
      shallow: true,
    });
  };

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useProjectListingInfQuery();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  return (
    <div>
      {initListings.map((listing) => (
        <ProjectCard
          key={listing.details.id}
          listing={listing}
          isActive={key === slugify(listing.details.name)}
          onClick={() => onClickListing(listing)}
        />
      ))}

      {data &&
        data.pages.map((page, i) =>
          page.listings.map((listing, j) => (
            <div
              key={listing.details.id}
              ref={
                i === data.pages.length - 1 && j === page.listings.length - 1
                  ? ref
                  : undefined
              }
            >
              <ProjectCard
                key={listing.details.id}
                listing={listing}
                isActive={key === slugify(listing.details.name)}
                onClick={() => onClickListing(listing)}
              />
            </div>
          )),
        )}

      {Boolean(error) && (
        <div>
          <p>error = {JSON.stringify(error)}</p>
        </div>
      )}

      {isLoading && (
        <div>
          <p>Fetching project lists ...</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div>
          <p>Loading more project listings ...</p>
        </div>
      )}

      {data && !hasNextPage && <p>No more project listings to load</p>}
    </div>
  );
};
