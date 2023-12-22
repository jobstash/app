import { Select } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useSkillsUsedContext } from '@jobstash/profile/state';

const Input = () => {
  const { tagOptions, setSearchValue, onTagSelect } = useSkillsUsedContext();

  return (
    <Select
      searchable
      clearable
      data={tagOptions}
      placeholder="Add skill used"
      size="lg"
      classNames={{
        input: cn(
          'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
        itemsWrapper: 'bg-dark-gray',
        item: '[&[data-hovered]]:bg-gray [&[data-selected]]:bg-gray',
      }}
      limit={200}
      onSearchChange={(v) => {
        setSearchValue(v);
      }}
      onChange={onTagSelect}
    />
  );
};

export default Input;
