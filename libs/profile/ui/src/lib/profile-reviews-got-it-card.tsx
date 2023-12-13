import { memo, useState } from 'react';

import { GithubOutlineHugeIcon, Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

const ProfileReviewsGotItCard = () => {
  // TODO: Implement when to show this card. Temporarily set to false during refactor-ssr check-wallet issue.
  const [showGotItCard, setShowGotItCard] = useState(false);

  const onClick = () => setShowGotItCard(false);

  if (!showGotItCard) return null;

  return (
    <GotItCard
      icon={<GithubOutlineHugeIcon />}
      title="Organization Reviews"
      onClick={onClick}
    >
      <Text color="dimmed">
        By sharing your own experiences and honest feedback, you can help other
        developers make more informed decisions about where to work.
      </Text>
      <Text color="dimmed">
        Additionally, it can help hold organizations accountable for their
        actions and incentivize them to create better working environments.
      </Text>
      <Text color="dimmed">
        The information entered will be{' '}
        <span className="text-bold">public</span>, though your identity will be{' '}
        <span className="text-bold">anonymous</span>.
      </Text>
    </GotItCard>
  );
};

export default memo(ProfileReviewsGotItCard);
