import { memo } from 'react';

import { Checkbox } from '@mantine/core';

import { Button, RemoveTechIcon, TechWrapper } from '@jobstash/shared/ui';

const ProfileRepoTech = () => (
  <div className="flex px-4 py-3 border border-gray gap-4 rounded-xl items-center">
    <div>
      <TechWrapper id="c54daf74-ce9b-4c89-bc50-143335e3f4c8">
        JAVASCRIPT
      </TechWrapper>
    </div>
    <div className="flex justify-center p-2 border border-gray rounded-xl">
      <Checkbox label="I can teach" color="gray" radius="xl" />
    </div>
    <div className="-ml-2">
      <Button variant="transparent" size="sm" className="px-0">
        <RemoveTechIcon />
      </Button>
    </div>
  </div>
);

export default memo(ProfileRepoTech);
