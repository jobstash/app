import { Select } from '@mantine/core';

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
      addSkill(skill);
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
      maxDropdownHeight={280}
      onChange={onChange}
    />
  );
};

export default SkillsInput;
