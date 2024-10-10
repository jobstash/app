import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  Spinner,
} from '@nextui-org/react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { LogoTitle } from '@jobstash/shared/ui';

import { selectedOrgAtom } from '../core/atoms';
import { useSearchInput } from '../hooks/use-search-input';

const LABEL_TEXT = 'Enter Organization Name';
const EMPTY_CONTENT_TEXT = 'Type atleast 2 letters to show results';

interface Props {
  size?: AutocompleteProps['size'];
}

export const OrgSearchInput = ({ size = 'sm' }: Props) => {
  const { push } = useRouter();
  const { data, isLoading } = useAllOrgs();

  const orgData = useMemo(() => data ?? [], [data]);

  const getName = useCallback((item: OrgItem) => item.name, []);

  const onSelect = useCallback(
    (item: OrgItem) => {
      push(`/godmode/organizations/manage/${item.orgId}`);
    },
    [push],
  );

  const {
    isLoadingInput,
    showSpinner,
    items,
    selectedKey,
    onInputChange,
    onSelectionChange,
  } = useSearchInput<OrgItem>({
    data: orgData,
    getItemKey: getName,
    getItemValue: getName,
    atom: selectedOrgAtom,
    onSelect,
  });

  const hasSpinner = isLoading || isLoadingInput || showSpinner;

  return (
    <div className="flex items-center gap-4 w-full justify-center">
      <Autocomplete
        allowsCustomValue
        fullWidth
        size={size}
        label={LABEL_TEXT}
        listboxProps={{
          emptyContent: EMPTY_CONTENT_TEXT,
        }}
        isDisabled={isLoading || isLoadingInput}
        variant="bordered"
        selectedKey={selectedKey}
        defaultItems={items}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      >
        {({ value, name, location, website, logoUrl }) => (
          <AutocompleteItem key={value} textValue={value}>
            <LogoTitle
              title={name}
              location={location}
              avatarProps={{
                alt: name,
                src: getLogoUrl(
                  website.length > 0 ? website[0] : null,
                  logoUrl,
                ),
              }}
            />
          </AutocompleteItem>
        )}
      </Autocomplete>

      {hasSpinner && <Spinner size="sm" color="white" />}
    </div>
  );
};
