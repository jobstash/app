import { useRouter } from 'next/router';

import { AutocompleteItem } from '@nextui-org/react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { SearchInput } from './search-input';

export const OrgSearchInput = () => {
  const { push } = useRouter();
  const { data, isLoading } = useAllOrgs();

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
      labelText="Enter Organization Name"
      emptyContentText="Type at least 2 letters to show results"
      isLoading={isLoading}
      onSelect={(item) => push(`/godmode/organizations/manage/${item.orgId}`)}
    />
  );
};
