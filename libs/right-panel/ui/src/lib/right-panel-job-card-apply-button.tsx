/* eslint-disable camelcase */
import { useState } from 'react';

import { useModal, useSIWE } from 'connectkit';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';
import { ECOSYSTEMS, GA_EVENT_ACTION } from '@jobstash/shared/core';
import { gaEvent, getEcosystemSubdomain } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import { useSendJobApplyInteractionMutation } from '@jobstash/jobs/state';

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

  const [isDisabled, setIsDisabled] = useState(false);

  const isAnon = !isConnected || !isSignedIn;

  const { isSupported, subdomain } = getEcosystemSubdomain();
  const isEthdam = isSupported && subdomain === ECOSYSTEMS.ETHDAM;

  const isOneClick = hasUser || isEthdam;

  const openApplyPage = () => {
    if (isAnon && isOneClick) {
      setOpen(true);
      return;
    }

    if (typeof window !== 'undefined') {
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

  const { mutate: mutateJobApply } = useSendJobApplyInteractionMutation();

  const onClickApplyJob = () => {
    sendAnalyticsEvent();

    if (isDev) {
      mutateJobApply(shortUUID);
    }

    if (!isAnon && isOneClick) {
      setIsDisabled(true);
    }

    openApplyPage();
  };

  const text = isOneClick
    ? isDisabled
      ? 'Already applied for this job'
      : '1-Click Apply'
    : 'Apply for this job';

  return (
    <RightPanelCta
      text={text}
      isDisabled={isDisabled}
      onClick={onClickApplyJob}
    />
  );
};
