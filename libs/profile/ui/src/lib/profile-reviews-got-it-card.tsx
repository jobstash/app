import { memo } from 'react';

import { useProfileReviewsPageContext } from '@jobstash/profile/state';

import { GithubOutlineHugeIcon, Hexagon, Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

const ProfileReviewsGotItCard = () => {
  const { showGotItCard, setShowGotItCard } = useProfileReviewsPageContext();

  const onClick = () => setShowGotItCard(false);

  if (!showGotItCard) return null;

  return (
    <GotItCard
      icon={<Hexagon icon={<GithubOutlineHugeIcon />} />}
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
        The information entered will be public, though your identity will be
        anonymous.
      </Text>
    </GotItCard>
  );
};

export default memo(ProfileReviewsGotItCard);
