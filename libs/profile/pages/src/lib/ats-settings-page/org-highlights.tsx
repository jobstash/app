import { forwardRef, useEffect, useState } from 'react';

import { Autocomplete, SelectItemProps } from '@mantine/core';
import { Chip, Divider, Spinner } from '@nextui-org/react';

import { ATSClient, DEFAULT_ATS_PREFERENCE } from '@jobstash/profile/core';

import {
  useHighlightOrgOptions,
  useUpdateATSPreference,
} from '@jobstash/profile/state';

import { Heading, Text } from '@jobstash/shared/ui';

interface OptionProps {
  orgId: string;
  name: string;
  value: string;
}

interface Props {
  atsClient: ATSClient;
}

export const OrgHighlights = ({ atsClient }: Props) => {
  const { data: allOrgs, isPending: isPendingOrgOptions } =
    useHighlightOrgOptions();
  const [highlightedOrgs, setHighlightedOrgs] = useState<OptionProps[]>([]);

  // Update values with atsClient.preferences and populate details using orgOptions
  useEffect(() => {
    if (
      atsClient.preferences &&
      atsClient.preferences.highlightOrgs.length > 0
    ) {
      const currentHighlightedOrgs: OptionProps[] = [];

      for (const value of atsClient.preferences.highlightOrgs) {
        const org = allOrgs?.find((o) => o.orgId === value);
        if (org) {
          currentHighlightedOrgs.push(org);
        }
      }

      setHighlightedOrgs(currentHighlightedOrgs);
    }
  }, [atsClient.preferences, allOrgs]);

  const { mutate, isPending } = useUpdateATSPreference();

  const updatePreferences = (
    highlightOrgs: string[],
    successCb: () => void,
  ) => {
    if (atsClient.id && atsClient.name) {
      mutate(
        {
          clientId: atsClient.id,
          preferences: {
            ...DEFAULT_ATS_PREFERENCE,
            ...atsClient.preferences,
            platformName: atsClient.name as
              | 'jobstash'
              | 'greenhouse'
              | 'lever'
              | 'workable',
            highlightOrgs,
          },
        },
        {
          onSuccess: successCb,
        },
      );
    }
  };

  const onRemove = (id: string) => {
    updatePreferences(
      highlightedOrgs.filter((h) => h.orgId !== id).map((h) => h.orgId),
      () => setHighlightedOrgs((prev) => prev.filter((v) => v.orgId !== id)),
    );
  };

  const isLoading = isPending || isPendingOrgOptions;

  const [inputValue, setInputValue] = useState('');
  const onChangeInput = (value: string) => setInputValue(value);
  const onItemSubmit = (item: OptionProps) => {
    setInputValue('');
    updatePreferences(
      [...highlightedOrgs.map((h) => h.orgId), item.orgId],
      () => {
        setHighlightedOrgs((prev) => [...prev, item]);
      },
    );
  };

  const options = (allOrgs ?? []).filter(
    (org) => !highlightedOrgs.some((h) => h.value === org.value),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Heading size="sm">
          Pick orgs for which to highlight candidates:
        </Heading>
        {isLoading && <Spinner color="white" size="sm" />}
      </div>
      <div className="pl-4 flex flex-col gap-4 max-w-4xl">
        <Autocomplete
          withinPortal
          classNames={{
            root: 'w-96 text-white/80 text-base',
            input: 'bg-dark border-none rounded-lg',
            dropdown:
              'bg-dark border-none text-white/80 w-fit overflow-x-hidden',
            item: 'hover:bg-darker-gray truncate overflow-x-hidden',
          }}
          size="lg"
          placeholder="Search among 6k organizations in web3 ..."
          disabled={isLoading}
          limit={300}
          maxDropdownHeight={300}
          dropdownPosition="bottom"
          value={inputValue}
          data={options}
          itemComponent={AutoCompleteItem}
          filter={(value, item) =>
            item.name.toLowerCase().includes(value.toLowerCase().trim())
          }
          onChange={onChangeInput}
          onItemSubmit={onItemSubmit}
        />

        {[...highlightedOrgs].length > 0 && (
          <>
            <Divider />

            <div className="flex gap-3 items-center flex-wrap">
              {[...highlightedOrgs]
                .sort((a, b) => a.value.localeCompare(b.value))
                .map(({ orgId, name }) => (
                  <Chip
                    key={orgId}
                    size="lg"
                    radius="sm"
                    variant="faded"
                    isDisabled={isPending}
                    onClose={() => onRemove(orgId)}
                  >
                    {name}
                  </Chip>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ItemProps extends SelectItemProps {
  orgId: string;
  name: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ name, orgId, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Text>{name}</Text>
    </div>
  ),
);

AutoCompleteItem.displayName = 'AutoCompleteItem';
