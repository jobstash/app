/* eslint-disable camelcase */

import { Spinner } from '@nextui-org/spinner';
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

import RightPanelCta from './right-panel-cta';

interface Props {
  url: string;
  shortUUID: string;
  orgName: string;
  classification: string | null;
  hasUser?: boolean;
}

export const RightPanelJobCardApplyButton = (props: Props) => {
  const { url, shortUUID, orgName, hasUser, classification } = props;

  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();
  const { setOpen } = useModal();

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
  const isLoadingJobsApplied = isPendingJobsApplied || isFetchingJobsApplied;
  const hasApplied = appliedJobs
    .map((job) => job.shortUUID)
    .includes(shortUUID);

  const { mutate: mutateJobApply, isPendingMutation } =
    useSendJobApplyInteractionMutation({
      isDevOneClick,
      jobPost,
      appliedJobs,
    });

  const showSpinner = [
    isOneClick && isDev && isLoadingJobsApplied,
    isPendingJobPost,
    isPendingMutation,
  ].includes(true);

  const openApplyPage = () => {
    if (isAnon && isOneClick) {
      setOpen(true);
      return;
    }

    // Open job-url in new tab (if not 1-click apply)
    if (!isOneClick && typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const sendAnalyticsEvent = () => {
    gaEvent(GA_EVENT_ACTION.JOB_APPLY, {
      event_category: 'job',
      job_shortuuid: shortUUID,
      job_classification: classification ?? '',
      organization_name: orgName,
    });
  };

  const onClickApplyJob = () => {
    sendAnalyticsEvent();

    if (isDev) {
      mutateJobApply(shortUUID);
    }

    openApplyPage();
  };

  const text = isOneClick
    ? hasApplied
      ? 'Already applied for this job'
      : '1-Click Apply'
    : 'Apply for this job';

  return (
    <div className="h-[40px] w-[112px] flex justify-center">
      {showSpinner ? (
        <Spinner size="sm" color="white" />
      ) : (
        <RightPanelCta
          text={text}
          isDisabled={hasApplied || isLoadingJobsApplied}
          onClick={onClickApplyJob}
        />
      )}
    </div>
  );
};
