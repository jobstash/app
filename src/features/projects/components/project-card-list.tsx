import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSetAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  TEXT_ROUTE_SECTION_PROJECTS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/core/constants';
import type { ProjectPost } from '~/core/interfaces';
import { activePostAtom } from '~/shared/atoms';
import { useRouteSegments } from '~/shared/hooks';
import { createRouteString, slugify } from '~/shared/utils';

import { useProjectPostInfQuery } from '../hooks';

import { ProjectCard } from './project-card';

interface Props {
  initListings: ProjectPost[];
}

export const ProjectCardList = ({ initListings }: Props) => {
  const {
    segments: { key },
    push,
  } = useRouteSegments();
  const setActiveListing = useSetAtom(activePostAtom);

  const onClickListing = (post: ProjectPost) => {
    setActiveListing(post);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    const route = createRouteString(
      TEXT_ROUTE_SECTION_PROJECTS,
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
  } = useProjectPostInfQuery();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  return (
    <div className='space-y-8'>
      {initListings.map((post) => (
        <ProjectCard
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
              <ProjectCard
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
          <p>Fetching project posts ...</p>
        </div>
      )}

      {isFetchingNextPage && (
        <div>
          <p>Loading more project posts ...</p>
        </div>
      )}

      {data && !hasNextPage && <p>No more project posts to load</p>}
    </div>
  );
};
