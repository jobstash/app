import { useEffect, useState, useTransition } from 'react';

import { useDebouncedValue } from '@mantine/hooks';
import { PrimitiveAtom, useSetAtom } from 'jotai';

interface Item {
  value: string;
}

interface Props<T> {
  data: T[];
  atom: PrimitiveAtom<(T & { value: string }) | null>;
  getItemKey: (item: T) => string;
  getItemValue: (item: T) => string;
  onSelect: (Item: T) => void;
}

export const useSearchInput = <T>({
  data,
  getItemKey,
  getItemValue,
  atom,
  onSelect,
}: Props<T>) => {
  const [inputState, setInputState] = useState({
    selectedKey: '' as string | null,
    inputValue: '',
  });

  const setSelectedItem = useSetAtom(atom);

  const { selectedKey, inputValue } = inputState;
  const [debouncedInputValue] = useDebouncedValue(inputValue, 200);

  const [filteredItems, setFilteredItems] = useState<(T & Item)[]>([]);

  const [showSpinner, startSpinner] = useTransition();
  const [debouncedShowSpinner] = useDebouncedValue(showSpinner, 50);

  useEffect(() => {
    startSpinner(() => {
      const filteredOrgs =
        data && debouncedInputValue.length > 1
          ? data
              .map((item) => ({ ...item, value: getItemValue(item) }))
              .filter((item) =>
                getItemKey(item)
                  .toLowerCase()
                  .includes(debouncedInputValue.toLowerCase()),
              )
          : [];

      setFilteredItems(filteredOrgs);
    });
  }, [data, debouncedInputValue, getItemKey, getItemValue]);

  const [isLoading, setIsLoading] = useState(false);
  const onSelectionChange = async (key: React.Key | null) => {
    if (key) {
      setIsLoading(true);
    }

    const filteredItem = filteredItems.find((item) => getItemKey(item) === key);

    setSelectedItem(filteredItem ?? null);
    setInputState(() => ({
      inputValue: filteredItem ? getItemValue(filteredItem) : '',
      selectedKey: key as string | null,
    }));

    if (filteredItem) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 400)); // Fake loading feels nice lel
      onSelect(filteredItem);
    }
  };

  const onInputChange = (value: string) => {
    setInputState((prev) => ({
      inputValue: value,
      selectedKey: value ? prev.selectedKey : null,
    }));
  };

  return {
    isLoadingInput: isLoading,
    showSpinner: debouncedShowSpinner,
    items: filteredItems,
    selectedKey,
    onInputChange,
    onSelectionChange,
  };
};
