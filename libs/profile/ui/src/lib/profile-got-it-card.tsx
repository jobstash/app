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
      title="Welcome to Your Profile"
      onClick={onClick}
    >
      <Text color="dimmed">
        <b>Availability & Contact</b>: 🔝 At the top, set your job availability,
        how you prefer to be contacted, and your location. Perfect for snagging
        local gigs!
      </Text>
      <Text color="dimmed">
        <b>Connect Accounts:</b> 🔗 On the left sidebar, hook up your GitHub and
        professional email. These links juice up your profile, making your work
        history and skills shine.
      </Text>
      <Text color="dimmed">
        <b>Skills & CV:</b> 👩‍💻 Below, flaunt your skills and tag any you could
        teach with "Can Mentor Others". Elevate your job match game! Plus, drop
        a link to your CV, portfolio or other things you built to spotlight your
        expertise.
      </Text>
      <Text color="dimmed">
        Remember: a well-set profile is your ticket to the best job matches on
        JobStash. Update your details and preferences to stay visible to
        potential employers.
      </Text>
    </GotItCard>
  );
};

export default memo(ProfileGotItCard);
