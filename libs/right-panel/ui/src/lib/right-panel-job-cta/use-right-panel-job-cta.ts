import { useModal, useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';
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
  hasUser?: boolean;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const useRightPanelJobCTA = (props: Props) => {
  const { url, shortUUID, hasUser = false, sendAnalyticsEvent } = props;

  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();

  const { role } = useAuthContext();
  const isDev = role === CHECK_WALLET_ROLES.DEV;
  const isAnon = !isConnected || !isSignedIn;

  const { isSupported, subdomain } = getEcosystemSubdomain();
  const isEthdam = isSupported && subdomain === ECOSYSTEMS.ETHDAM;
  const isOneClick = hasUser || isEthdam;
  const isDevOneClick = isOneClick && isDev;

  const { data: jobPost, isPending: isPendingJobPost } = useJobPost(shortUUID);
  const { appliedJobs, isPendingJobsApplied, isFetchingJobsApplied } =
    useJobsApplied();
  const isLoadingJobsApplied =
    isDev && (isPendingJobsApplied || isFetchingJobsApplied);

  const hasApplied =
    isDev &&
    hasUser &&
    appliedJobs.map((job) => job.shortUUID).includes(shortUUID);

  const { mutate: mutateJobApply, isPendingMutation } =
    useSendJobApplyInteractionMutation({
      isDevOneClick,
      jobPost,
      appliedJobs,
    });

  const devApplyMutation = () => {
    if (isDev) {
      mutateJobApply(shortUUID);
    }
  };

  const isLoading = [
    isOneClick && isDev && isLoadingJobsApplied,
    isPendingJobPost,
    isPendingMutation,
  ].includes(true);

  const { setOpen } = useModal();
  const openModalIfAnon = () => {
    if (isAnon) {
      setOpen(true);
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
