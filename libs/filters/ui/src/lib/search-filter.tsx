import { memo } from 'react';

import { TextInput } from '@mantine/core';

import { capitalize } from '@jobstash/shared/utils';

import { useFiltersContext } from '@jobstash/filters/state';

import { Button, CloseIcon, SearchInputIcon } from '@jobstash/shared/ui';

import { roboto } from '@jobstash/shared/core';

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
    <div className='pb-4 border-b border-white'>
      <h2 className={`${roboto.variable} font-roboto antialiased mt-20 text-[40px] md:text-[56px] leading-10 text-white mb-8 font-medium`}>Explore</h2>
      <form onSubmit={onSubmitSearch}>
        <TextInput
          icon={<SearchInputIcon />}
          placeholder={routeSection === '/jobs' as string ? 'Discover exciting job opportunities.' : `Search ${capitalize(routeSection.slice(1))}`}
          size="25px"
          rightSectionWidth={0}
          rightSection={
            <div className="items-center hidden lg:flex">
              {/* <Button isIcon isDisabled={isLoading} onClick={clearSearch}>
                <CloseIcon />
              </Button> */}
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
              // background: 'rgba(255, 255, 255, 0.1)',
              // fontSize: 16,
              border: 'transparent',
            },
          }}
          classNames={{
            input: `bg-transparent text-[18px] text-white !pl-10 ${roboto.variable} font-roboto placeholder:text-white md:text-[20px]`,
          }}
          onChange={onChangeSearch}
        />
      </form>
    </div>
  );
};

export default memo(SearchFilter);
