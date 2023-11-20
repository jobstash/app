import { memo, useState } from 'react';

import { ProfileHugeIcon, Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

interface Props {
  initShow: boolean;
}

const ProfileGotItCard = ({ initShow }: Props) => {
  const [showGotItCard, setShowGotItCard] = useState(initShow);

  const onClick = () => setShowGotItCard(false);

  if (!showGotItCard) return null;

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
