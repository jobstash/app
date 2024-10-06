import { SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';
import { openNewTab } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

import { CTATooltip } from './right-panel-job-cta/cta-tooltip';
import RightPanelCta from './right-panel-cta';

const TEXT = 'White Glove Service';

const TooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        {TEXT}
      </Text>
      <Text className="text-white/70">
        Before you submit your CV, get personalized feedback on whether this job
        is a great match for you based on our insider knowledge.
      </Text>
      <Text className="text-white/70">
        Ask us anything about the job, and let us help you tweak your profile
        for this vacancy—all for free. No hidden costs, just honest help.
      </Text>
    </div>
  </div>
);

const onClick = () => openNewTab(SUPPORT_TELEGRAM_URL);

export const WhiteGloveCTA = () => {
  const { isCryptoNative, isLoading, isAuthenticated } = useAuthContext();

  const isAnon = !isAuthenticated;

  if (isAnon || !isCryptoNative) return null;

  return (
    <CTATooltip defaultOpen={false} content={<TooltipContent />}>
      <RightPanelCta text={TEXT} isDisabled={isLoading} onClick={onClick} />
    </CTATooltip>
  );
};
