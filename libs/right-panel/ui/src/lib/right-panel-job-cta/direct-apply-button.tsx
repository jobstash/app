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

  return (
    <CTATooltip content={<DirectApplyTooltipContent />} defaultOpen={false}>
      <RightPanelCta text={TEXT} onClick={onClick} />
    </CTATooltip>
  );
};

const TEXT = 'Apply Directly';
