/* eslint-disable camelcase */
import { useModal, useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ECOSYSTEMS, GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent, getEcosystemSubdomain } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import {
  useJobPost,
  useJobsApplied,
  useSendJobApplyInteractionMutation,
} from '@jobstash/jobs/state';

interface Props {
  url: string;
  shortUUID: string;
  orgName: string;
  classification: string | null;
  hasUser?: boolean;
}

export const useRightPanelJobCTA = (props: Props) => {
  const { url, shortUUID, orgName, hasUser = false, classification } = props;

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

  const sendAnalyticsEvent = () => {
    gaEvent(GA_EVENT_ACTION.JOB_APPLY, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: orgName,
      user_role: role,
    });
  };

  const { setOpen } = useModal();
  const openModalIfAnon = () => {
    if (isAnon) {
      setOpen(true);
    }
  };

  return {
    isAnon,
    isOneClick,
    isDirect: !isOneClick && typeof window !== 'undefined',
    isLoading,
    sendAnalyticsEvent,
    devApplyMutation,
    openModalIfAnon,
    hasApplied,
    url,
  };
};
