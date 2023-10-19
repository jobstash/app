import { memo } from 'react';

import { BreadCrumbs, Button } from '@jobstash/shared/ui';

const breadCrumbs = [{ title: 'Your Profile', href: '/profile' }];

const ProfileSubHeader = () => (
  <div className="flex justify-between items-center">
    <BreadCrumbs breadCrumbs={breadCrumbs} />

    <div className="flex items-center space-x-4">
      <Button isIcon isDisabled>
        [ ? ]
      </Button>
    </div>
  </div>
);

export default memo(ProfileSubHeader);
