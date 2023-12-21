import { memo } from 'react';

import { useAtom } from 'jotai';

import {
  showGotItCardAtom,
  useProfileRepoPageContext,
} from '@jobstash/profile/state';

import { BreadCrumbs, Button, Text } from '@jobstash/shared/ui';

const breadCrumbs = [
  { title: 'Your Profile', href: '/profile' },
  { title: 'Your Repositories', href: '/profile/repositories' },
];

const ProfileRepoSubHeader = () => {
  const { profileRepoCount } = useProfileRepoPageContext();
  const hasOrgReview = profileRepoCount && profileRepoCount > 0;

  const [, setShowGotItCard] = useAtom(showGotItCardAtom);
  const onClickGotItCardHelper = () => {
    setShowGotItCard((prev) => ({ ...prev, repositories: !prev.repositories }));
  };

  return (
    <div className="px-4 flex justify-between items-center">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="flex items-center space-x-4">
        {hasOrgReview && (
          <Text color="dimmed">{`Known Repositories: ${profileRepoCount}`}</Text>
        )}

        <Button isIcon onClick={onClickGotItCardHelper}>
          [ ? ]
        </Button>
      </div>
    </div>
  );
};

export default memo(ProfileRepoSubHeader);
