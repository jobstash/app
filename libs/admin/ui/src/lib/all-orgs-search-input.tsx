import { useRouter } from 'next/router';

import { AutocompleteItem } from '@nextui-org/react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

const LABEL = 'Enter Organization Name';
const EMPTY_CONTENT = 'Type at least 2 letters to show results';

export const AllOrgsSearchInput = () => {
  const { push } = useRouter();
  const { data, isLoading } = useAllOrgs();

  const onSelect = ({ orgId }: OrgItem) =>
    push(`/godmode/organizations/manage/${orgId}`);

  return (
    <SearchInput<OrgItem>
      size="lg"
      data={data ?? []}
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
      labelText={LABEL}
      emptyContentText={EMPTY_CONTENT}
      isLoading={isLoading}
      onSelect={onSelect}
    />
  );
};
