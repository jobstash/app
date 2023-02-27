import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import { activePostAtom } from '~/shared/atoms';
import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_JOBS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/shared/core/constants';
import { JobPost } from '~/shared/core/interfaces';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString } from '~/shared/utils';

import { useJobListingInfQuery } from '../hooks';
import { checkJobIsActive, createJobKey } from '../utils';

import { JobCard } from './job-card';

interface Props {
  initListings: JobPost[];
}

export const JobCardList = ({ initListings }: Props) => {
  const { segments, push } = useRouteSegments();
  const setActiveListing = useSetAtom(activePostAtom);

  const onClickListing = (post: JobPost) => {
    setActiveListing(post);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    const route = createRouteString(
      TEXT_ROUTE_SECTION_JOBS,
      createJobKey(post),
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
      {initListings.map((post) => (
        <JobCard
          key={post.details.id}
          post={post}
          isActive={checkJobIsActive(segments.key, post)}
          onClick={() => onClickListing(post)}
        />
      ))}

      {data &&
        data.pages.map((page, i) =>
          page.posts.map((post, j) => (
            <div
              key={post.details.id}
              ref={
                i === data.pages.length - 1 && j === page.posts.length - 1
                  ? ref
                  : undefined
              }
            >
              <JobCard
                post={post}
                isActive={checkJobIsActive(segments.key, post)}
                onClick={() => onClickListing(post)}
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
