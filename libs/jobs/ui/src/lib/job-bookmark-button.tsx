import { useAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';

import {
  lastJobBookmarkedAtom,
  useJobBookmarkMutation,
} from '@jobstash/jobs/state';

import { BookmarkButton } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
  isBookmarked: boolean;
  isFetching: boolean;
}

const JobBookmarkButton = ({ jobPost, isBookmarked, isFetching }: Props) => {
  const { isLoading: isLoadingMutation, mutate } =
    useJobBookmarkMutation(isBookmarked);

  const [lastJobBookmarked, setLastJobBookmarked] = useAtom(
    lastJobBookmarkedAtom,
  );

  const onClick = () => {
    // Show pending state until refetch - of a specific job instead of list
    setLastJobBookmarked(jobPost.shortUUID);

    mutate(jobPost);
  };

  // Show spinner only when remove-bookmark until refetch done
  const showSpinner =
    isFetching && isBookmarked && jobPost.shortUUID === lastJobBookmarked;
  const isLoading = isLoadingMutation || showSpinner;

  return (
    <BookmarkButton
      isLoading={isLoading}
      isBookmarked={isBookmarked}
      onClick={onClick}
    />
  );
};

export default JobBookmarkButton;
