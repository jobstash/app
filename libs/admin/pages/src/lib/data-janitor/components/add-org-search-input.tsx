import { AutocompleteItem, AutocompleteProps } from '@nextui-org/react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

interface Props {
  isPending: boolean;
  onAddOrg: (id: string) => void;
  labelText?: string;
  variant?: AutocompleteProps['variant'];
  showSpinnerOnSelect?: boolean;
  clearSelectionOnSelect?: boolean;
}

export const AddOrgSearchInput = ({
  onAddOrg,
  isPending,
  labelText = 'Enter Organization Name',
  variant,
  showSpinnerOnSelect,
  clearSelectionOnSelect,
}: Props) => {
  const { data, isLoading } = useAllOrgs();

  const items = data ?? [];

  return (
    <SearchInput<OrgItem>
      clearSelectionOnSelect={clearSelectionOnSelect}
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
      labelText={labelText}
      variant={variant}
      emptyContentText="Type at least 2 letters to show results"
      isLoading={isLoading || isPending}
      showSpinnerOnSelect={showSpinnerOnSelect}
      onSelect={(item) => onAddOrg(item.orgId)}
    />
  );
};
