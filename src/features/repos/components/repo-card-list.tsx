import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_REPOSITORIES,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/core/constants';
import type { RepoListing } from '~/core/interfaces';
import { activeListingAtom } from '~/shared/atoms';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString, slugify } from '~/shared/utils';

import { useRepoListingInfQuery } from '../hooks';

import { RepoCard } from './repo-card';

interface Props {
  initListings: RepoListing[];
}
export const RepoCardList = ({ initListings }: Props) => {
  const {
    segments: { key },
    push,
  } = useRouteSegments();
  const setActiveListing = useSetAtom(activeListingAtom);

  const onClickListing = (listing: RepoListing) => {
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    const route = createRouteString(
      TEXT_ROUTE_SECTION_REPOSITORIES,
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
  } = useRepoListingInfQuery();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  return (
    <div>
      {initListings.map((listing) => (
        <RepoCard
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
              <RepoCard
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
          <p>Fetching repo lists ...</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div>
          <p>Loading more repo listings ...</p>
        </div>
      )}

      {data && !hasNextPage && <p>No more repo listings to load</p>}
    </div>
  );
};
