import { useAtom } from 'jotai';

import {
  lastJobBookmarkedAtom,
  useJobBookmarkMutation,
} from '@jobstash/jobs/state';

import { BookmarkButton } from '@jobstash/shared/ui';

interface Props {
  shortUUID: string;
  isBookmarked: boolean;
  isFetching: boolean;
}

const JobBookmarkButton = ({ shortUUID, isBookmarked, isFetching }: Props) => {
  const { isLoading: isLoadingMutation, mutate } =
    useJobBookmarkMutation(isBookmarked);

  const [lastJobBookmarked, setLastJobBookmarked] = useAtom(
    lastJobBookmarkedAtom,
  );

  const onClick = () => {
    // Show pending state until refetch - of a specific job instead of list
    setLastJobBookmarked(shortUUID);

    mutate(shortUUID);
  };

  // Show spinner only when remove-bookmark until refetch done
  const showSpinner =
    isFetching && isBookmarked && shortUUID === lastJobBookmarked;
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
