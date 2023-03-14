import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { filterParamsAtom } from '~/features/filters/atoms';
import { Filters } from '~/features/filters/components';
import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_JOBS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/shared/core/constants';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString } from '~/shared/utils';

import { activeJobPostAtom } from '../atoms';
import type { JobPost } from '../core/interfaces';
import { useJobListingInfQuery } from '../hooks';
import { checkJobIsActive, createJobKey } from '../utils';

import { JobCard } from './job-card';

interface Props {
  initListing: JobPost;
}

export const JobCardList = ({ initListing }: Props) => {
  const initShortUUID = initListing.jobpost.shortUUID;

  const filterParams = useAtomValue(filterParamsAtom);
  const [activeListing, setActiveListing] = useAtom(activeJobPostAtom);

  const {
    data,
    error,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useJobListingInfQuery(filterParams);

  const jobposts = useMemo(
    () =>
      data
        ? [
            initListing,
            ...data.pages
              .flatMap((d) => d.data)
              .filter((d) => d.jobpost.shortUUID !== initShortUUID),
          ]
        : [initListing],
    [data, initListing, initShortUUID],
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const parentOffsetRef = useRef(0);

  useEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: jobposts.length,
    estimateSize: () => 450,
    // ScrollMargin: parentOffsetRef.current,
  });

  const items = virtualizer.getVirtualItems();

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  const { segments, push } = useRouteSegments();

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

  return (
    <>
      <Filters jobCount={data?.pages[0].total ?? 0} isLoadingData={isLoading} />

      <div ref={parentRef}>
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            className="flex flex-col items-center gap-y-8"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${
                items[0]?.start ?? 0 - virtualizer.options.scrollMargin
              }px)`,
            }}
          >
            {items.map(({ key, index, start, end }) => {
              const isLast = index >= jobposts.length - 1;
              const listing = jobposts[index];

              return (
                <div
                  key={key}
                  ref={virtualizer.measureElement}
                  data-index={index}
                  className="w-full max-w-4xl"
                >
                  <div ref={isLast ? inViewRef : undefined}>
                    <JobCard
                      listing={listing}
                      isActive={checkJobIsActive(segments.key, listing)}
                      onClick={() => onClickListing(listing)}
                    />
                  </div>

                  {isLast && (
                    <div className="mt-12">
                      {Boolean(error) && (
                        <div>
                          <p>
                            Failed fetching job-list: {(error as Error).message}
                          </p>
                        </div>
                      )}

                      {isFetchingNextPage && (
                        <div>
                          <p className="w-full pb-8 text-center">
                            Loading more job posts ...
                          </p>
                        </div>
                      )}

                      {data && !hasNextPage && <p>No more job posts to load</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="my-8">
          <p className="w-full pb-8 text-center">Fetching job posts ...</p>
        </div>
      )}
    </>
  );
};
