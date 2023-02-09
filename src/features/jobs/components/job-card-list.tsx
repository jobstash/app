import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_JOBS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/core/constants';
import type { JobListing } from '~/core/interfaces';
import { activeListingAtom } from '~/shared/atoms';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString } from '~/shared/utils';

import { useJobListingInfQuery } from '../hooks';
import { checkJobIsActive, createJobKey } from '../utils';

import { JobCard } from './job-card';

interface Props {
  initListings: JobListing[];
}

export const JobCardList = ({ initListings }: Props) => {
  const { segments, push } = useRouteSegments();
  const setActiveListing = useSetAtom(activeListingAtom);

  const onClickListing = (listing: JobListing) => {
    setActiveListing(listing);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    const route = createRouteString(
      TEXT_ROUTE_SECTION_JOBS,
      createJobKey(listing),
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
  } = useJobListingInfQuery();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  return (
    <div>
      {initListings.map((listing) => (
        <JobCard
          key={listing.details.id}
          listing={listing}
          isActive={checkJobIsActive(segments.key, listing)}
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
              <JobCard
                listing={listing}
                isActive={checkJobIsActive(segments.key, listing)}
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
          <p>Fetching job lists ...</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div>
          <p>Loading more job listings ...</p>
        </div>
      )}

      {data && !hasNextPage && <p>No more job listings to load</p>}
    </div>
  );
};
