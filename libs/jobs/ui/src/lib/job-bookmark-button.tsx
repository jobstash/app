import { useJobBookmarkMutation } from '@jobstash/jobs/state';

import { BookmarkButton } from '@jobstash/shared/ui';

interface Props {
  shortUUID: string;
  isBookmarked: boolean;
  isFetching: boolean;
}

const JobBookmarkButton = ({ shortUUID, isBookmarked, isFetching }: Props) => {
  const { isLoading: isLoadingMutation, mutate } =
    useJobBookmarkMutation(isBookmarked);

  const onClick = () => {
    mutate({
      shortUUID,
    });
  };

  const isLoading = isFetching || isLoadingMutation;

  return (
    <BookmarkButton
      isLoading={isLoading}
      isBookmarked={isBookmarked}
      onClick={onClick}
    />
  );
};

export default JobBookmarkButton;
