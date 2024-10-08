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

const ProfileRepoSkill = ({
  id,
  name,
  canTeach,
  onTagRemove,
  onClickCanTeach,
}: Props) => (
  <div className="flex p-2 md:px-4 md:py-3 border border-gray gap-4 rounded-xl items-center w-full md:w-auto">
    <div>
      <TechWrapper isChecked id={id} canTeach={canTeach}>
        {name}
      </TechWrapper>
    </div>
    <div className="flex items-center justify-center p-2 border border-gray rounded-xl">
      <Checkbox
        label="Can Mentor Others"
        color="gray"
        radius="xl"
        defaultChecked={canTeach}
        classNames={{
          body: 'flex items-center',
        }}
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

export default memo(ProfileRepoSkill);
