import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { type ProfileRepoTagPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { postProfileRepoTag } from '@jobstash/profile/data';

import { activeProfileRepoAtom } from '../atoms/active-profile-repo-atom';
import { useProfileRepoPageContext } from '../contexts/profile-repo-page-context';

export const useTagsUsedMutation = () => {
  const { setIsLoadingCard } = useProfileRepoPageContext();
  const queryClient = useQueryClient();

  const [activeProfileRepo, setActiveProfileRepo] = useAtom(
    activeProfileRepoAtom,
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: (payload: ProfileRepoTagPayload) => postProfileRepoTag(payload),
    onMutate() {
      setIsLoadingCard(true);
    },
    onSuccess({ message }, payload) {
      // TODO: Update profile-repo-list,
      // TODO: Update profile repo state (should update disableSave flag)
      notifSuccess({
        title: 'Tags Updated',
        message,
      });

      // Invalidate profile-repo-list
      queryClient.invalidateQueries({ queryKey: ['profile-repo-list'] });
      queryClient.refetchQueries({ queryKey: ['profile-repo-list'] });

      // FIXME: Check that tags listed in repo matches what's on tags-used section
      if (activeProfileRepo) {
        setActiveProfileRepo({
          ...activeProfileRepo,
          tags: [...new Set([...activeProfileRepo.tags, ...payload.tagsUsed])],
        });
      }
    },
    onError(error) {
      notifError({
        title: 'Update tags failed!',
        message: (error as Error).message,
      });
    },
    onSettled() {
      setIsLoadingCard(false);
    },
  });

  return { isLoading, mutate };
};
