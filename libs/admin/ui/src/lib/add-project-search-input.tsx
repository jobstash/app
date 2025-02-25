import { useMemo } from 'react';

import { AutocompleteItem } from '@heroui/autocomplete';

import { ProjectItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllProjects } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

const LABEL = 'Enter Project Name';
const EMPTY_CONTENT = 'Type at least 2 letters to show results';

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

  const onSelect = ({ id }: ProjectItem) => onAddProject(id);

  return (
    <SearchInput<ProjectItem>
      clearSelectionOnSelect
      size="sm"
      data={items ?? []}
      renderItem={({ website, name, logoUrl }) => (
        <AutocompleteItem key={name} textValue={name}>
          <LogoTitle
            title={name}
            avatarProps={{
              alt: name,
              src: getLogoUrl(website ?? null, logoUrl),
            }}
          />
        </AutocompleteItem>
      )}
      labelText={LABEL}
      emptyContentText={EMPTY_CONTENT}
      isLoading={isLoading}
      showSpinnerOnSelect={false}
      onSelect={onSelect}
    />
  );
};
