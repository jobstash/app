import { memo } from 'react';

import { Checkbox } from '@mantine/core';

import { Button, RemoveTechIcon, TechWrapper } from '@jobstash/shared/ui';

interface Props {
  id: string;
  name: string;
  canTeach: boolean;
  onTagRemove: (id: string) => void;
  onClickCanTeach: (id: string, canTeach: boolean) => void;
}

const ProfileRepoTag = ({
  id,
  name,
  canTeach,
  onTagRemove,
  onClickCanTeach,
}: Props) => (
  <div className="flex px-4 py-3 border border-gray gap-4 rounded-xl items-center">
    <div>
      <TechWrapper id={id}>{name}</TechWrapper>
    </div>
    <div className="flex justify-center p-2 border border-gray rounded-xl">
      <Checkbox
        label="I can teach"
        color="gray"
        radius="xl"
        defaultChecked={canTeach}
        onChange={(e) => onClickCanTeach(id, e.currentTarget.checked)}
      />
    </div>
    <div className="-ml-2">
      <Button
        variant="transparent"
        size="sm"
        className="px-0"
        onClick={() => onTagRemove(id)}
      >
        <RemoveTechIcon />
      </Button>
    </div>
  </div>
);

export default memo(ProfileRepoTag);
