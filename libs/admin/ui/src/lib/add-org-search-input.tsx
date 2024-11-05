import { AutocompleteItem, AutocompleteProps } from '@nextui-org/react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

const LABEL = 'Enter Organization Name';
const EMPTY_CONTENT = 'Type at least 2 letters to show results';

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
  labelText = LABEL,
  variant,
  showSpinnerOnSelect,
  clearSelectionOnSelect,
}: Props) => {
  const { data, isLoading } = useAllOrgs();

  const items = data ?? [];

  const onSelect = ({ orgId }: OrgItem) => onAddOrg(orgId);

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
      emptyContentText={EMPTY_CONTENT}
      isLoading={isLoading || isPending}
      showSpinnerOnSelect={showSpinnerOnSelect}
      onSelect={onSelect}
    />
  );
};
