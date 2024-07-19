/* eslint-disable react/no-unused-prop-types */
import { Spinner } from '@nextui-org/spinner';

import { CheckWalletRole } from '@jobstash/auth/core';

import { DirectApplyButton } from './direct-apply-button';
import { OneClickApplyButton } from './one-click-apply-button';
import { useRightPanelJobCTA } from './use-right-panel-job-cta';

interface Props {
  url: string;
  shortUUID: string;
  hasUser?: boolean;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const RightPanelJobCTA = (props: Props) => {
  const {
    isLoading,
    isAnon,
    isOneClick,
    isDirect,
    openModalIfAnon,
    devApplyMutation,
    sendAnalytics,
    hasApplied,
    url,
  } = useRightPanelJobCTA(props);

  const applyButton = isOneClick ? (
    <OneClickApplyButton
      isAnon={isAnon}
      hasApplied={hasApplied}
      sendAnalyticsEvent={sendAnalytics}
      devApplyMutation={devApplyMutation}
      openModalIfAnon={openModalIfAnon}
    />
  ) : isDirect ? (
    <DirectApplyButton
      url={url}
      sendAnalyticsEvent={sendAnalytics}
      devApplyMutation={devApplyMutation}
    />
  ) : null;

  return (
    <div className="h-[40px] flex justify-center gap-4">
      {isLoading ? <Loading /> : applyButton}
    </div>
  );
};

const Loading = () => (
  <div className="flex justify-center w-[112px]">
    <Spinner size="sm" color="white" />
  </div>
);
