import { Select } from '@mantine/core';

import { type Tag } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { useProfileSkillsContext } from '@jobstash/profile/state';

const SkillsInput = () => {
  const { options, addSkill } = useProfileSkillsContext();

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
    <div className="w-full flex items-center gap-4">
      <Select
        searchable
        data={options.map((option) => option.name)}
        placeholder="Add technology you used ..."
        size="lg"
        classNames={{
          root: 'min-w-[70%]',
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
    </div>
  );
};

export default SkillsInput;
