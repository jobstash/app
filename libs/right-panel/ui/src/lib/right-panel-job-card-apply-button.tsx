/* eslint-disable camelcase */

import { Spinner } from '@nextui-org/spinner';

import { PERMISSIONS } from '@jobstash/auth/core';
import { COMMUNITIES, GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent, getCommunitySubdomain } from '@jobstash/shared/utils';

import { useAuthContext, useHasPermission } from '@jobstash/auth/state';
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

  const { isAuthenticated, showLoginModal, permissions } = useAuthContext();
  const hasPermission = useHasPermission(PERMISSIONS.USER);

  const { isSupported, subdomain } = getCommunitySubdomain();
  const isEthdam = isSupported && subdomain === COMMUNITIES.ETHDAM;
  const isOneClick = hasUser || isEthdam;

  const { data: jobPost, isPending: isPendingJobPost } = useJobPost(shortUUID);
  const { appliedJobs, isPendingJobsApplied, isFetchingJobsApplied } =
    useJobsApplied();
  const isLoadingJobsApplied =
    hasPermission && (isPendingJobsApplied || isFetchingJobsApplied);

  const hasApplied =
    hasPermission &&
    hasUser &&
    appliedJobs.map((job) => job.shortUUID).includes(shortUUID);

  const { mutate: mutateJobApply, isPendingMutation } =
    useSendJobApplyInteractionMutation({
      isOneClick: isOneClick && hasPermission,
      jobPost,
      appliedJobs,
    });

  const showSpinner = [
    isOneClick && hasPermission && isLoadingJobsApplied,
    isPendingJobPost,
    isPendingMutation,
  ].includes(true);

  const openApplyPage = () => {
    if (!isAuthenticated) {
      showLoginModal();
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
      user_role: JSON.stringify(permissions),
    });
  };

  const onClickApplyJob = () => {
    sendAnalyticsEvent();

    if (hasPermission) {
      mutateJobApply(shortUUID);
    }

    openApplyPage();
  };

  const text = hasApplied
    ? 'Already applied for this job'
    : isOneClick
    ? '1-Click Apply'
    : hasPermission
    ? 'Apply for this job'
    : 'Connect Your Wallet & Sign Up to Apply';

  return (
    <div className="h-[40px] w-[112px] flex justify-center">
      {showSpinner ? (
        <Spinner size="sm" color="white" />
      ) : (
        <RightPanelCta
          text={text}
          isDisabled={hasApplied}
          onClick={onClickApplyJob}
        />
      )}
    </div>
  );
};
