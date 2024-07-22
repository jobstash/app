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
    <div className='py-4 border-b border-white lg:border-transparent'>
      <form onSubmit={onSubmitSearch}>
        <TextInput
          icon={<SearchInputIcon />}
          placeholder={`Search ${capitalize(routeSection.slice(1))}`}
          size="25px"
          value={searchQuery ?? ''}
          disabled={isLoading}
          radius="md"
          styles={{
            input: {
              background: 'transparent',
              fontSize: 16,
              border: 'transparent',
            },
          }}
          classNames={{
            input: '!pl-10 !pr-0 !bg-transparent text-white placeholder:text-white',
          }}
          onChange={onChangeSearch}
        />
      </form>
    </div>
  );
};

export default memo(SearchFilter);
