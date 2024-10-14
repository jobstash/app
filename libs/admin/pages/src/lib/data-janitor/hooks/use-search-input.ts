import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useDebouncedValue } from '@mantine/hooks';

interface Props<T extends { name: string }> {
  data?: T[];
  getItemUrl: (item: T) => string;
}

export const useSearchInput = <T extends { name: string }>({
  data,
  getItemUrl,
}: Props<T>) => {
  const router = useRouter();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebouncedValue(value, 200);

  const onInputChange = (value: string) => {
    setValue(value);
  };

  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  useEffect(() => {
    const items =
      data && debouncedValue.length > 1
        ? data.filter((item) =>
            item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
          )
        : [];

    setFilteredItems(items);
  }, [data, debouncedValue]);

  const [isLoading, setIsLoading] = useState(false);
  const onSelectionChange = async (key: React.Key | null) => {
    if (key) {
      setIsLoading(true);
    }

    const filteredItem = filteredItems.find((item) => item.name === key);

    setSelectedKey(key as string | null);
    setValue(filteredItem ? filteredItem.name : '');

    if (filteredItem) {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 400)); // Fake loading feels nice lel
      router.push(getItemUrl(filteredItem));
    }
  };

  return {
    isLoadingInput: isLoading,
    items: filteredItems,
    selectedKey,
    onInputChange,
    onSelectionChange,
  };
};
