import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_JOBS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/shared/core/constants';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString } from '~/shared/utils';

import { activeJobPostAtom } from '../atoms';
import { JobPost } from '../core/interfaces';
import { useJobListingInfQuery } from '../hooks';
import { checkJobIsActive, createJobKey } from '../utils';

import { JobCard } from './job-card';

interface Props {
  initListings: JobPost[];
}

export const JobCardList = ({ initListings }: Props) => {
  const { segments, push } = useRouteSegments();
  const setActiveListing = useSetAtom(activeJobPostAtom);

  const onClickListing = (listing: JobPost) => {
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
    <div className="space-y-8">
      {initListings.map((listing) => (
        <JobCard
          key={listing.jobpost.id}
          listing={listing}
          isActive={checkJobIsActive(segments.key, listing)}
          onClick={() => onClickListing(listing)}
        />
      ))}

      {data &&
        data.pages.map((page, i) =>
          page.data.map((listing, j) => (
            <div
              key={listing.jobpost.id}
              ref={
                i === data.pages.length - 1 && j === page.data.length - 1
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
          <p>Failed fetching job-list: {(error as Error).message}</p>
        </div>
      )}

      {isLoading && (
        <div>
          <p className="w-full pb-8 text-center">Fetching job posts ...</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div>
          <p className="w-full pb-8 text-center">Loading more job posts ...</p>
        </div>
      )}

      {data && !hasNextPage && <p>No more job posts to load</p>}
    </div>
  );
};
