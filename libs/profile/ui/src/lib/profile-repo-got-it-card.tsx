import { memo } from 'react';

import { useAtom } from 'jotai';

import { showGotItCardAtom } from '@jobstash/profile/state';

import { GithubOutlineHugeIcon, Text } from '@jobstash/shared/ui';

import GotItCard from './got-it-card';

const ProfileRepoGotItCard = () => {
  const [showGotItCard, setShowGotItCard] = useAtom(showGotItCardAtom);

  const onClick = () =>
    setShowGotItCard((prev) => ({ ...prev, repositories: false }));

  if (!showGotItCard.repositories) return null;

  return (
    <GotItCard
      icon={<GithubOutlineHugeIcon />}
      title="Your Repository List"
      onClick={onClick}
    >
      <Text color="dimmed">
        We have imported the public repositories available from the Github
        accounts provided. For each repository in the list that you think
        highlights your Web3 and Crypto expertise, you can add tags used and
        leave a comment of your contribution.
      </Text>
      <Text color="dimmed">
        This can help to build your reputation and credibility within the
        industry and make you stand out from other candidates. By taking the
        time to curate and showcase your best work, you can demonstrate
        potential employers that you are a dedicated and skilled developer who
        is committed to producing high-quality work.
      </Text>
    </GotItCard>
  );
};

export default memo(ProfileRepoGotItCard);
