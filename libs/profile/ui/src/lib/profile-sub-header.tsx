import { memo } from 'react';

import { useAtom } from 'jotai';

import { showGotItCardAtom } from '@jobstash/profile/state';

import { BreadCrumbs, Button } from '@jobstash/shared/ui';

const breadCrumbs = [{ title: 'Your Profile', href: '/profile' }];

const ProfileSubHeader = () => {
  const [, setShowGotItCard] = useAtom(showGotItCardAtom);

  const onClickGotItCardHelper = () => {
    setShowGotItCard((prev) => ({ ...prev, profile: !prev.profile }));
  };

  return (
    <div className="flex justify-between items-center">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="flex items-center space-x-4">
        <Button isIcon onClick={onClickGotItCardHelper}>
          [ ? ]
        </Button>
      </div>
    </div>
  );
};

export default memo(ProfileSubHeader);
