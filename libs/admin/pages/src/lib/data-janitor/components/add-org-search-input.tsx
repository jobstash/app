import { AutocompleteItem } from '@nextui-org/react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

interface Props {
  isPending: boolean;
  onAddOrg: (id: string) => void;
}

export const AddOrgSearchInput = ({ onAddOrg, isPending }: Props) => {
  const { data, isLoading } = useAllOrgs();

  const items = data ?? [];

  return (
    <SearchInput<OrgItem>
      clearSelectionOnSelect
      size="sm"
      data={items ?? []}
      renderItem={({ name, location, websites, logoUrl }) => (
        <AutocompleteItem key={name} textValue={name}>
          <LogoTitle
            title={name}
            location={location}
            avatarProps={{
              alt: name,
              src: getLogoUrl(
                websites.length > 0 ? websites[0] : null,
                logoUrl,
              ),
            }}
          />
        </AutocompleteItem>
      )}
      labelText="Enter Organization Name"
      emptyContentText="Type at least 2 letters to show results"
      isLoading={isLoading || isPending}
      onSelect={(item) => onAddOrg(item.orgId)}
    />
  );
};
