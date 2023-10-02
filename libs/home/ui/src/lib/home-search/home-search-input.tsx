import { TextInput } from '@mantine/core';

import { useHomeSearchContext } from '@jobstash/home/state';

import { Button, SearchInputIcon } from '@jobstash/shared/ui';

const HomeSearchInput = () => {
  const { setShowPopularKeywords } = useHomeSearchContext();

  const onBlur = () => {
    setShowPopularKeywords(false);
  };

  const onFocus = () => {
    setShowPopularKeywords(true);
  };

  return (
    <TextInput
      placeholder="Search using keywords"
      size="lg"
      rightSection={
        <div className="hidden items-center gap-x-2 lg:flex">
          <Button isIcon>
            <SearchInputIcon />
          </Button>
        </div>
      }
      classNames={{
        root: 'w-full',
        input: 'bg-transparent border-none',
      }}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default HomeSearchInput;
