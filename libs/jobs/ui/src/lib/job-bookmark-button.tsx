import { useMemo, useRef } from 'react';

import { useSetAtom } from 'jotai';

import { PERMISSIONS } from '@jobstash/auth/core';
import { JobPost } from '@jobstash/shared/core';

import { useRoleClick } from '@jobstash/auth/state';
import {
  jobBookmarkAtom,
  useAllJobFolders,
  useSavedJobs,
  useUpdateSavedJobs,
} from '@jobstash/jobs/state';

import { BookmarkedIcon, BookmarkIcon, CardSet } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
  isFetching: boolean;
}

const JobBookmarkButton = ({ jobPost, isFetching }: Props) => {
  const { isLoading: isLoadingSavedJobs, data: savedJobs } = useSavedJobs();
  const { isLoading: isLoadingJobFolders, data: jobFolders } =
    useAllJobFolders();

  const bookmarkedJob = useMemo(
    () =>
      [
        ...(savedJobs ?? []),
        ...(jobFolders?.data ?? []).flatMap((folder) => folder.jobs),
      ].find((job) => job.shortUUID === jobPost.shortUUID),
    [jobFolders, savedJobs, jobPost],
  );

  const isBookmarked = Boolean(bookmarkedJob);

  const setJobBookmarkState = useSetAtom(jobBookmarkAtom);

  const onClick = () => {
    setJobBookmarkState(() => ({
      isOpen: true,
      jobPost,
      showNewListForm: false,
    }));
  };

  const { hasPermission: isAuthd, roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback: onClick,
  });

  return (
    <CardSet
      icon={isAuthd && isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />}
      className="px-[3px]"
      onClick={roleClick}
    >
      {null}
    </CardSet>
  );
};

export default JobBookmarkButton;
