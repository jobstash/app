import RightPanelCta from '../right-panel-cta';

import { CTATooltip } from './cta-tooltip';
import { SignUpTooltipContent } from './sign-up-tooltip-content';

interface Props {
  isAnon: boolean;
  isOneClick: boolean;
  openModalIfAnon: () => void;
  sendAnalyticsEvent: () => void;
}

export const AnonSignupButton = ({
  isAnon,
  isOneClick,
  openModalIfAnon,
  sendAnalyticsEvent,
}: Props) => {
  if (!isAnon) return null;

  const onClick = () => {
    sendAnalyticsEvent();
    openModalIfAnon();
  };

  const text = isOneClick ? ONE_CLICK_TEXT : ANON_TEXT;

  return (
    <CTATooltip content={<SignUpTooltipContent />}>
      <RightPanelCta text={text} onClick={onClick} />
    </CTATooltip>
  );
};

const ANON_TEXT = 'Join Talent Pool';
const ONE_CLICK_TEXT = 'Sign Up to 1-Click Apply';
