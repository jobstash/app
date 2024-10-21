import { useRouter } from 'next/router';

import { AutocompleteItem } from '@nextui-org/react';

import { ProjectItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllProjects } from '@jobstash/admin/state';
import { useProjectDetails } from '@jobstash/projects/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

interface ProjectSearchItemProps {
  id: string;
  name: string;
  logo?: string | null;
}

const ProjectSearchItem = ({ id, name, logo }: ProjectSearchItemProps) => {
  const { data } = useProjectDetails(id);

  return (
    <LogoTitle
      title={name}
      avatarProps={{
        alt: name,
        src: getLogoUrl(data?.website ?? null, logo),
      }}
    />
  );
};

export const ProjectSearchInput = () => {
  const { push } = useRouter();
  const { data, isLoading } = useAllProjects();

  return (
    <SearchInput<ProjectItem>
      size="lg"
      data={data ?? []}
      renderItem={({ id, name, logo }) => (
        <AutocompleteItem key={name} textValue={name}>
          <ProjectSearchItem id={id} name={name} logo={logo} />
        </AutocompleteItem>
      )}
      labelText="Enter Project Name"
      emptyContentText="Type at least 2 letters to show results"
      isLoading={isLoading}
      onSelect={(item) => push(`/godmode/projects/manage/${item.id}`)}
    />
  );
};
