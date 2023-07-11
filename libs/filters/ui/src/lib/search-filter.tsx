import { type ChangeEventHandler, type FormEventHandler, memo } from 'react';

import { TextInput } from '@mantine/core';

import { type RouteSection } from '@jobstash/shared/core';
import { capitalize, decodeBase64 } from '@jobstash/shared/utils';

import { Button, CloseIcon, SearchInputIcon } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  clearSearch: () => void;
  onSubmit: FormEventHandler;
  onChange: ChangeEventHandler<HTMLInputElement>;
  searchQuery?: string | null;
  routeSection: RouteSection;
}

const SearchFilter = ({
  isLoading,
  onSubmit,
  clearSearch,
  onChange,
  searchQuery,
  routeSection,
}: Props) => (
  <form onSubmit={onSubmit}>
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
      value={searchQuery ? decodeBase64(searchQuery) : ''}
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
      onChange={onChange}
    />
  </form>
);

export default memo(SearchFilter);
