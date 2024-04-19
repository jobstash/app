import RightPanelCta from '../right-panel-cta';

import { CTATooltip } from './cta-tooltip';
import { OneClickTooltipContent } from './one-click-tooltip-content';

interface Props {
  isAnon: boolean;
  hasApplied: boolean;
  sendAnalyticsEvent: () => void;
  devApplyMutation: () => void;
  openModalIfAnon: () => void;
}

export const OneClickApplyButton = ({
  isAnon,
  hasApplied,
  sendAnalyticsEvent,
  devApplyMutation,
  openModalIfAnon,
}: Props) => {
  if (isAnon) return null;

  const text = hasApplied ? ALREADY_APPLIED_TEXT : ONE_CLICK_APPLY_TEXT;

  const onClick = () => {
    sendAnalyticsEvent();
    openModalIfAnon();
    devApplyMutation();
  };

  return (
    <CTATooltip content={<OneClickTooltipContent />}>
      <RightPanelCta text={text} isDisabled={hasApplied} onClick={onClick} />
    </CTATooltip>
  );
};

const ALREADY_APPLIED_TEXT = 'Already applied for this job';
const ONE_CLICK_APPLY_TEXT = '1-Click Apply';
