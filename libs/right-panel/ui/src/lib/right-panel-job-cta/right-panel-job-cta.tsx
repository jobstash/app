/* eslint-disable react/no-unused-prop-types */
import { Spinner } from '@nextui-org/spinner';

import { AnonSignupButton } from './anon-signup-button';
import { DirectApplyButton } from './direct-apply-button';
import { OneClickApplyButton } from './one-click-apply-button';
import { useRightPanelJobCTA } from './use-right-panel-job-cta';

interface Props {
  url: string;
  shortUUID: string;
  orgName: string;
  classification: string | null;
  hasUser?: boolean;
}

export const RightPanelJobCTA = (props: Props) => {
  const {
    isLoading,
    isAnon,
    isOneClick,
    isDirect,
    sendAnalyticsEvent,
    openModalIfAnon,
    devApplyMutation,
    hasApplied,
    url,
  } = useRightPanelJobCTA(props);

  const applyButton = isOneClick ? (
    <OneClickApplyButton
      isAnon={isAnon}
      hasApplied={hasApplied}
      sendAnalyticsEvent={sendAnalyticsEvent}
      devApplyMutation={devApplyMutation}
      openModalIfAnon={openModalIfAnon}
    />
  ) : isDirect ? (
    <DirectApplyButton
      url={url}
      sendAnalyticsEvent={sendAnalyticsEvent}
      devApplyMutation={devApplyMutation}
    />
  ) : null;

  return (
    <div className="h-[40px] flex justify-center gap-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AnonSignupButton
            isAnon={isAnon}
            isOneClick={isOneClick}
            sendAnalyticsEvent={sendAnalyticsEvent}
            openModalIfAnon={openModalIfAnon}
          />
          {applyButton}
        </>
      )}
    </div>
  );
};

const Loading = () => (
  <div className="flex justify-center w-[112px]">
    <Spinner size="sm" color="white" />
  </div>
);
