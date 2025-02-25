import { useState } from 'react';

import { Spinner } from "@heroui/spinner";
import { useAtom } from 'jotai';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';
import {
  lastJobBookmarkedAtom,
  useUpdateSavedJobs,
} from '@jobstash/jobs/state';

import { BookmarkedIcon, BookmarkIcon, Button } from '@jobstash/shared/ui';

interface Props {
  shortUUID: string;
  isBookmarked: boolean;
  isLoadingFetch?: boolean;
  isDisabled?: boolean;
}

export const RightPanelOrgJobBookmarkButton = (props: Props) => {
  const { shortUUID, isBookmarked, isLoadingFetch, isDisabled } = props;

  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const [lastJobBookmarked, setLastJobBookmarked] = useAtom(
    lastJobBookmarkedAtom,
  );

  const { isLoading: isLoadingMutation, mutate } =
    useUpdateSavedJobs(isBookmarked);

  const onClick = () => {
    // Show pending state until refetch - of a specific job instead of list
    setLastJobBookmarked(shortUUID);
    mutate(shortUUID);
  };

  const callback = () => {
    setBookmarked((prev) => !prev);
    onClick();
  };

  const { hasPermission: isAuthd, roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback,
  });

  // Show spinner only when remove-bookmark until refetch done
  const showSpinner =
    isLoadingFetch && isBookmarked && shortUUID === lastJobBookmarked;

  const isLoading = isLoadingMutation || showSpinner;

  if (isLoading) return <Spinner color="white" size="sm" />;

  return (
    <Button isIcon isDisabled={isDisabled} onClick={roleClick}>
      {isAuthd && bookmarked ? (
        <BookmarkedIcon />
      ) : (
        <BookmarkIcon classNames={{ wrapper: 'w-6 h-6', icon: 'w-6 h-6' }} />
      )}
    </Button>
  );
};
