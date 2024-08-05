/* eslint-disable react/no-unused-prop-types */
import { Button, Link } from '@nextui-org/react';

import { CheckWalletRole } from '@jobstash/auth/core';

import RightPanelCta from '../right-panel-cta';
import { CTATooltip } from '../right-panel-job-cta/cta-tooltip';

import { useCryptoNativeJobCTA } from './use-crypto-native-job-cta';

interface Props {
  jobId: string;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const CryptoNativeJobCTA = (props: Props) => {
  const { link, text, onClick, isLoading, isDisabled, tooltipContent } =
    useCryptoNativeJobCTA(props);

  if (link) {
    return (
      <Button
        as={Link}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-l from-primary to-tertiary"
        radius="sm"
      >
        Job Concierge Apply
      </Button>
    );
  }

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
