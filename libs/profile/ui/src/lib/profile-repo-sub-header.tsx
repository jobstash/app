import { memo } from 'react';

import { useProfileRepoPageContext } from '@jobstash/profile/state';

import { BreadCrumbs, Button, RefreshIcon, Text } from '@jobstash/shared/ui';

const breadCrumbs = [
  { title: 'Your Profile' },
  { title: 'Your Repositories', href: '/profile/repositories' },
];

const ProfileRepoSubHeader = () => {
  const { profileRepoCount } = useProfileRepoPageContext();

  return (
    <div className="px-4 flex justify-between items-center">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="flex items-center space-x-4">
        <Text color="dimmed">{`Known Repositories: ${profileRepoCount}`}</Text>
        <Button isIcon>
          <RefreshIcon />
        </Button>
        <Button isIcon>[ ? ]</Button>
      </div>
    </div>
  );
};

export default memo(ProfileRepoSubHeader);
