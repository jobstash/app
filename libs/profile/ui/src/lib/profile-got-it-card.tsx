import { memo } from 'react';

import { useAtom } from 'jotai';

import { showGotItCardAtom } from '@jobstash/profile/state';

import { ProfileHugeIcon, Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

const ProfileGotItCard = () => {
  const [showGotItCard, setShowGotItCard] = useAtom(showGotItCardAtom);

  const onClick = () =>
    setShowGotItCard((prev) => ({ ...prev, profile: false }));

  if (!showGotItCard.profile) return null;

  return (
    <GotItCard
      icon={<ProfileHugeIcon />}
      title="Your Repository List"
      onClick={onClick}
    >
      <Text color="dimmed">
        You can edit and add technical skills to your profile to have better job
        matches. You can also add an external link to your CV, ensuring that you
        are showcasing your expertise in the best possible light.
      </Text>
      <Text color="dimmed">
        Additionally, you can manage your connected Github accounts. Add more,
        delete and choose your primary Github account.
      </Text>
    </GotItCard>
  );
};

export default memo(ProfileGotItCard);
