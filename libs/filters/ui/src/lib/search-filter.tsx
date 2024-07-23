import { memo, useMemo } from 'react';

import { TextInput } from '@mantine/core';

import { capitalize } from '@jobstash/shared/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { SearchInputIcon } from '@jobstash/shared/ui';

const SearchFilter = () => {
  const { state, onSubmitSearch, onChangeSearch, routeSection } =
    useFiltersContext();

  const rawQuery = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('query');
  }, []);

  const searchQuery = state?.filterValues?.query;

  return (
    <div className="py-4 border-b border-white lg:border-transparent">
      <form onSubmit={onSubmitSearch}>
        <TextInput
          icon={<SearchInputIcon />}
          placeholder={`Search ${capitalize(routeSection.slice(1))}`}
          size="25px"
          value={searchQuery ?? rawQuery ?? ''}
          radius="md"
          styles={{
            input: {
              background: 'transparent',
              fontSize: 16,
              border: 'transparent',
            },
          }}
          classNames={{
            input:
              '!pl-10 !pr-0 !bg-transparent text-white placeholder:text-white',
          }}
          onChange={onChangeSearch}
        />
      </form>
    </div>
  );
};

export default memo(SearchFilter);
