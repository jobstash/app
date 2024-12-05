import React, { startTransition, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAsyncList } from 'react-stately';

import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';

import { usePreferredTermsFormContext } from '@jobstash/admin/state';

const ITEMS_PER_PAGE = 10;

const SynonymsInput = () => {
  const {
    isLoading,
    synonymOptions: options,
    initPrimaryTerm,
    primaryTerm,
    addSynonym,
  } = usePreferredTermsFormContext();

  const [inputValue, setInputValue] = useState('');

  const list = useAsyncList<{ name: string }, number>({
    async load({ cursor, filterText }) {
      const filtered = filterText
        ? options.filter((item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase()),
          )
        : options;

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
    list.setFilterText(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const { ref: inViewRef } = useInView({
    threshold: 0.4,
    onChange(inView) {
      if (inView) {
        list.loadMore();
      }
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const onSelectionChange = (key: React.Key | null) => {
    if (key) {
      addSynonym(key as string);
      setInputValue('');
      inputRef.current?.blur();
    }
  };

  return (
    <Autocomplete
      ref={inputRef}
      aria-label="Primary Term"
      placeholder="Select multiple synonym terms"
      radius="sm"
      shouldCloseOnBlur={false}
      isLoading={list.isLoading}
      items={list.items}
      classNames={{
        listboxWrapper: 'pb-8',
      }}
      isDisabled={(!initPrimaryTerm && !primaryTerm) || isLoading}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSelectionChange={onSelectionChange}
    >
      {list.items
        .filter(({ name }) => name !== primaryTerm)
        .map(({ name }, i) => (
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

export default SynonymsInput;
