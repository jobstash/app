import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { OrgProfileInfoPayload } from '@jobstash/profile/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { postOrgProfileInfo } from '@jobstash/profile/data';

export const useOrgProfileInfoMutation = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();
  const { flow } = useAuthContext();
  const isInitProfile =
    flow === CHECK_WALLET_FLOWS.ORG_PROFILE ||
    flow === CHECK_WALLET_FLOWS.ORG_APPROVAL;

  const profileInfoQueryKey = [mwVersion, 'org-profile-info'];

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: OrgProfileInfoPayload) => postOrgProfileInfo(payload),
    onSuccess(profileInfo, payload) {
      queryClient.setQueryData(profileInfoQueryKey, profileInfo);

      const title = 'Profile Updated Successfully';

      const message = isInitProfile
        ? 'Your profile has been queued and will be processed shortly.'
        : 'Your profile changes have been saved.';

      notifSuccess({
        title,
        message,
        autoClose: 6000,
      });
    },
    onError() {
      notifError({
        title: 'Something went wrong :(',
        message: 'Please try again later.',
      });
    },
    onSettled() {
      // Always refetch after
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'org-profile-info'],
      });
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'check-wallet'],
      });
    },
  });

  return { isPending, mutate };
};
