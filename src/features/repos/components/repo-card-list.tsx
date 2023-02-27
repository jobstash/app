import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import { activePostAtom } from '~/shared/atoms';
import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_REPOSITORIES,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/shared/core/constants';
import type { RepoPost } from '~/shared/core/interfaces';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString, slugify } from '~/shared/utils';

import { useRepoListingInfQuery } from '../hooks';

import { RepoCard } from './repo-card';

interface Props {
  initListings: RepoPost[];
}
export const RepoCardList = ({ initListings }: Props) => {
  const {
    segments: { key },
    push,
  } = useRouteSegments();
  const setActiveListing = useSetAtom(activePostAtom);

  const onClickListing = (post: RepoPost) => {
    setActiveListing(post);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    const route = createRouteString(
      TEXT_ROUTE_SECTION_REPOSITORIES,
      slugify(post.details.name),
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
    <div className="space-y-8">
      {initListings.map((post) => (
        <RepoCard
          key={post.details.id}
          post={post}
          isActive={key === slugify(post.details.name)}
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
              <RepoCard
                key={post.details.id}
                post={post}
                isActive={key === slugify(post.details.name)}
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
          <p>Fetching repos ...</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div>
          <p>Loading more repo posts ...</p>
        </div>
      )}

      {data && !hasNextPage && <p>No more repo posts to load</p>}
    </div>
  );
};
