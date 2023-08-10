import { Select } from '@mantine/core';

import { cn } from '@jobstash/shared/utils';

import { useTechsUsedContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const TechsUsedInput = () => {
  const {
    techOptions,
    searchValue,
    disableAdd,
    setHoverAddButton,
    setSearchValue,
    onBlurSearch,
  } = useTechsUsedContext();

  return (
    <Select
      searchable
      data={techOptions}
      placeholder="Add technology used"
      size="lg"
      classNames={{
        input: cn(
          'rounded-lg bg-dark-gray text-white/60 text-lg placeholder:text-white/50 placeholder:text-lg focus:border-white/40',
        ),
        itemsWrapper: 'bg-dark-gray',
        item: '[&[data-hovered]]:bg-gray [&[data-selected]]:bg-gray',
      }}
      rightSection={
        <div key={searchValue} className="-ml-6 z-[99999]">
          <Button
            isActive
            variant="primary"
            className="bg-dark-gray hover:bg-gray"
            isDisabled={disableAdd}
            onMouseEnter={() => {
              setHoverAddButton(true);
            }}
            onMouseLeave={() => {
              setHoverAddButton(false);
            }}
          >
            Add
          </Button>
        </div>
      }
      onSearchChange={(v) => {
        setSearchValue(v);
      }}
      onBlur={onBlurSearch}
    />
  );
};

export default TechsUsedInput;
