import { AutocompleteItem } from '@nextui-org/react';

import { ProjectItem } from '@jobstash/admin/core';

import { useAllProjects } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

export const ProjectSearchInput = () => {
  const { data, isLoading } = useAllProjects();

  return (
    <SearchInput<ProjectItem>
      size="lg"
      data={data ?? []}
      getItemUrl={(item) => `/godmode/projects/manage/${item.id}`}
      renderItem={({ name, logo }) => (
        <AutocompleteItem key={name} textValue={name}>
          <LogoTitle
            title={name}
            avatarProps={{
              alt: name,
              src: logo ?? '',
            }}
          />
        </AutocompleteItem>
      )}
      labelText="Enter Project Name"
      emptyContentText="Type at least 2 letters to show results"
      isLoading={isLoading}
    />
  );
};
