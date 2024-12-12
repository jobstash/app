import { PERMISSIONS } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import RightPanelCta from '../right-panel-cta';

import { CTATooltip } from './cta-tooltip';
import { DirectApplyTooltipContent } from './direct-apply-tooltip-content';

interface Props {
  url: string;
  sendAnalyticsEvent: () => void;
  devApplyMutation: () => void;
}

export const DirectApplyButton = ({
  url,
  sendAnalyticsEvent,
  devApplyMutation,
}: Props) => {
  const onClick = () => {
    sendAnalyticsEvent();
    devApplyMutation();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  const { roleClick } = useRoleClick({
    allowed: PERMISSIONS.USER,
    callback: onClick,
  });

  return (
    <CTATooltip content={<DirectApplyTooltipContent />} defaultOpen={false}>
      <RightPanelCta text={TEXT} onClick={roleClick} />
    </CTATooltip>
  );
};

const TEXT = 'Apply Directly';
