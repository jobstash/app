import { memo, useMemo } from 'react';

import { TextInput } from '@mantine/core';

import { useFiltersContext } from '@jobstash/filters/state';

import { SearchInputIcon } from '@jobstash/shared/ui';

const SearchFilter = () => {
  const { state, onSubmitSearch, onChangeSearch, routeSection } =
    useFiltersContext();
  const { filteredItemsCount, isLoading } = useFiltersContext();

  const rawQuery = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('query');
  }, []);

  const searchQuery = state?.filterValues?.query;

  // Prepare filtered count for the placeholder
  const filteredCount = isLoading || filteredItemsCount === null || filteredItemsCount === undefined 
    ? '' // Set to an empty string when loading
    : filteredItemsCount.toString();


  return (
    <div className="py-4 border-b border-white lg:border-transparent">
      <form onSubmit={onSubmitSearch}>
        <TextInput
          icon={<SearchInputIcon />}
          placeholder={`Search ${filteredCount} ${routeSection
            .slice(1)
            .toLowerCase()
            .replaceAll('-', ' ')} `}
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
              '!pl-10 !pr-0 !bg-transparent min-w-[250px] text-white placeholder:text-white',
          }}
          onChange={onChangeSearch}
        />
      </form>
    </div>
  );
};

export default memo(SearchFilter);
