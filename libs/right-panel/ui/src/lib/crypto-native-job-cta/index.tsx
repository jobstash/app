/* eslint-disable react/no-unused-prop-types */
import { CheckWalletRole } from '@jobstash/auth/core';

import RightPanelCta from '../right-panel-cta';
import { CTATooltip } from '../right-panel-job-cta/cta-tooltip';

import { useCryptoNativeJobCTA } from './use-crypto-native-job-cta';

interface Props {
  jobId: string;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const CryptoNativeJobCTA = (props: Props) => {
  const { text, onClick, isLoading, isDisabled, tooltipContent } =
    useCryptoNativeJobCTA(props);

  return (
    <CTATooltip content={tooltipContent}>
      <RightPanelCta
        isLoading={isLoading}
        isDisabled={isDisabled}
        text={text}
        onClick={onClick}
      />
    </CTATooltip>
  );
};
