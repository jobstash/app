import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import {
  usePreferredTermsContext,
  usePreferredTermsFormContext,
} from '@jobstash/admin/state';

const ITEMS_PER_PAGE = 10;

export const PrimaryTermInput = () => {
  const { primaryTermOptions: options } = usePreferredTermsContext();

  const { primaryTerm, onChangePrimaryTerm, initPrimaryTerm, isLoading } =
    usePreferredTermsFormContext();

  const list = useAsyncList<{ name: string }, number>({
    async load({ cursor, filterText }) {
      const filtered = options.filter((item) =>
        item.name.toLowerCase().includes(filterText?.toLowerCase() ?? ''),
      );
      const start = cursor || 0;
      const items = filtered.slice(start, start + ITEMS_PER_PAGE);
      const nextCursor = start + ITEMS_PER_PAGE;
      return {
        items,
        cursor: nextCursor,
      };
    },
  });

  useEffect(() => {
    if (!initPrimaryTerm && list.filterText !== primaryTerm) {
      list.setFilterText(primaryTerm);
    }
  }, [initPrimaryTerm, list, primaryTerm]);

  const { ref: inViewRef } = useInView({
    threshold: 0.4,
    onChange(inView) {
      if (inView) {
        list.loadMore();
      }
    },
  });

  return (
    <Autocomplete
      aria-label="Primary Term"
      placeholder="Select primary term"
      radius="sm"
      shouldCloseOnBlur={false}
      isLoading={list.isLoading}
      inputProps={{
        isDisabled: isLoading,
      }}
      items={list.items}
      classNames={{
        listboxWrapper: 'pb-8',
      }}
      isDisabled={Boolean(initPrimaryTerm)}
      inputValue={primaryTerm ?? list.filterText}
      onInputChange={onChangePrimaryTerm}
    >
      {list.items.map(({ name }, i) => (
        <AutocompleteItem key={name} aria-label={name}>
          <div
            key={name}
            ref={i === list.items.length - 1 ? inViewRef : undefined}
          >
            {name}
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};
