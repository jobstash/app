import { memo } from 'react';

import { TextInput } from '@mantine/core';

import { capitalize } from '@jobstash/shared/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button, CloseIcon, SearchInputIcon } from '@jobstash/shared/ui';

const SearchFilter = () => {
  const {
    state,
    isLoading,
    onSubmitSearch,
    clearSearch,
    onChangeSearch,
    routeSection,
  } = useFiltersContext();

  const searchQuery = state?.filterValues?.query;

  return (
    <form onSubmit={onSubmitSearch}>
      <TextInput
        icon={<SearchInputIcon />}
        placeholder={`Search ${capitalize(routeSection.slice(1))}`}
        size="lg"
        rightSectionWidth={140}
        rightSection={
          <div className="hidden items-center gap-x-2 lg:flex">
            <Button isIcon isDisabled={isLoading} onClick={clearSearch}>
              <CloseIcon />
            </Button>
            <Button type="submit" isDisabled={isLoading}>
              Search
            </Button>
          </div>
        }
        value={searchQuery ?? ''}
        disabled={isLoading}
        radius="md"
        styles={{
          input: {
            background: 'rgba(255, 255, 255, 0.1)',
            fontSize: 16,
            border: 'transparent',
          },
        }}
        classNames={{
          input: 'py-7 bg-white/10',
        }}
        onChange={onChangeSearch}
      />
    </form>
  );
};

export default memo(SearchFilter);
