import { useMemo } from 'react';

import { AutocompleteItem } from '@nextui-org/react';

import { ProjectItem } from '@jobstash/admin/core';

import { useAllProjects } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

interface Props {
  stateIds: string[];
  onAddProject: (id: string) => void;
}

export const AddProjectSearchInput = ({ stateIds, onAddProject }: Props) => {
  const { data, isLoading } = useAllProjects();

  const items = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => !stateIds.includes(item.id));
  }, [data, stateIds]);

  return (
    <SearchInput<ProjectItem>
      clearSelectionOnSelect
      size="sm"
      data={items ?? []}
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
      showSpinnerOnSelect={false}
      onSelect={(item) => onAddProject(item.id)}
    />
  );
};
