import { useSetAtom } from 'jotai';

import { CheckWalletRole } from '@jobstash/auth/core';
import { ECOSYSTEMS } from '@jobstash/shared/core';
import { getEcosystemSubdomain } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import {
  useJobPost,
  useJobsApplied,
  useSendJobApplyInteractionMutation,
} from '@jobstash/jobs/state';

interface Props {
  url: string;
  shortUUID: string;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const useRightPanelJobCTA = (props: Props) => {
  const { url, shortUUID, sendAnalyticsEvent } = props;

  const { role, isAuthenticated, showLoginModal } = useAuthContext();
  const isAnon = !isAuthenticated;

  const { isSupported, subdomain } = getEcosystemSubdomain();
  const isEthdam = isSupported && subdomain === ECOSYSTEMS.ETHDAM;

  const { data: jobPost, isPending: isPendingJobPost } = useJobPost(shortUUID);
  const { appliedJobs, isPendingJobsApplied, isFetchingJobsApplied } =
    useJobsApplied();
  const isLoadingJobsApplied = isPendingJobsApplied || isFetchingJobsApplied;

  const isJobastashATS = jobPost?.organization.atsClient === 'jobstash';
  const isOneClick = isJobastashATS || isEthdam;

  const hasApplied = appliedJobs
    .map((job) => job.shortUUID)
    .includes(shortUUID);

  const { mutate: mutateJobApply, isPendingMutation } =
    useSendJobApplyInteractionMutation({
      isOneClick,
      jobPost,
      appliedJobs,
    });

  const devApplyMutation = () => {
    mutateJobApply(shortUUID);
  };

  const isLoading = [
    isOneClick && isLoadingJobsApplied,
    isPendingJobPost,
    isPendingMutation,
  ].includes(true);

  const openModalIfAnon = () => {
    if (isAnon) {
      showLoginModal();
    }
  };

  const sendAnalytics = () => sendAnalyticsEvent(role);

  return {
    isAnon,
    isOneClick,
    isDirect: !isOneClick && typeof window !== 'undefined',
    isLoading,
    devApplyMutation,
    openModalIfAnon,
    sendAnalytics,
    hasApplied,
    url,
  };
};
