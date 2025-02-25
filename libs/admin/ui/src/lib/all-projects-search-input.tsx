import { useRouter } from 'next/router';

import { AutocompleteItem } from '@heroui/autocomplete';

import { ProjectItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllProjects } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

const LABEL = 'Enter Project Name';
const EMPTY_CONTENT = 'Type at least 2 letters to show results';

export const AllProjectsSearchInput = () => {
  const { push } = useRouter();
  const { data, isLoading } = useAllProjects();

  const onSelect = ({ id }: ProjectItem) =>
    push(`/godmode/projects/manage/${id}`);

  return (
    <SearchInput<ProjectItem>
      size="lg"
      data={data ?? []}
      renderItem={({ name, website, logoUrl }) => (
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
      onSelect={onSelect}
    />
  );
};
