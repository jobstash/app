import { Select } from '@mantine/core';

import { type Tag } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import {
  useProfileDevInfoContext,
  useProfileSkillsContext,
} from '@jobstash/profile/state';

const SkillsInput = () => {
  const { addSkill } = useProfileDevInfoContext();
  const { options } = useProfileSkillsContext();

  const onChange = (value: string) => {
    const skill = options.find((option) => option.name === value);

    if (skill) {
      const newSkill = (({ normalizedName, ...o }) => o)(
        skill as Tag & { canTeach: boolean },
      );
      addSkill(newSkill);
    }
  };

  return (
    <Select
      searchable
      data={options.map((option) => option.name)}
      placeholder="Add technology you used ..."
      size="lg"
      classNames={{
        input: cn(
          'cursor-pointer rounded-xl bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
        itemsWrapper: 'bg-dark-gray',
        item: '[&[data-hovered]]:bg-gray [&[data-selected]]:bg-gray',
      }}
      value=""
      limit={200}
      maxDropdownHeight={280}
      onChange={onChange}
    />
  );
};

export default SkillsInput;
