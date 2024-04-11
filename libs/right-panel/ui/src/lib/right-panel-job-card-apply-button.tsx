/* eslint-disable camelcase */

import { Spinner } from '@nextui-org/spinner';
import { useQueryClient } from '@tanstack/react-query';
import { useModal, useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ECOSYSTEMS, GA_EVENT_ACTION } from '@jobstash/shared/core';
import {
  gaEvent,
  getEcosystemSubdomain,
  getLSMwVersion,
} from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import {
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

  const { isConnected, address } = useAccount();
  const { isSignedIn } = useSIWE();
  const { setOpen } = useModal();

  const { role } = useAuthContext();
  const isDev = role === CHECK_WALLET_ROLES.DEV;
  const isAnon = !isConnected || !isSignedIn;

  const { isSupported, subdomain } = getEcosystemSubdomain();
  const isEthdam = isSupported && subdomain === ECOSYSTEMS.ETHDAM;
  const isOneClick = hasUser || isEthdam;

  const queryClient = useQueryClient();
  const { jobsApplied, isPendingJobsApplied, isFetchingJobsApplied } =
    useJobsApplied();
  const isLoadingJobsApplied = isPendingJobsApplied || isFetchingJobsApplied;
  const hasApplied = jobsApplied
    .map((job) => job.shortUUID)
    .includes(shortUUID);

  const showSpinner = isOneClick && isDev && isLoadingJobsApplied;

  const { mutate: mutateJobApply } =
    useSendJobApplyInteractionMutation(isOneClick);

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

  const mwVersion = getLSMwVersion();
  const onClickApplyJob = () => {
    sendAnalyticsEvent();

    if (isDev) {
      mutateJobApply(shortUUID);
    }

    // Invalidate jobs applied fetch
    if (isDev && isOneClick) {
      queryClient.invalidateQueries({
        queryKey: [mwVersion, 'jobs-applied', address],
      });
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
