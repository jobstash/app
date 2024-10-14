import { useMemo } from 'react';

import { Autocomplete, AutocompleteProps, Spinner } from '@nextui-org/react';

import { useSearchInput } from '../hooks/use-search-input';

interface SearchInputProps<T> {
  data: T[];
  getItemUrl: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
  labelText: string;
  emptyContentText: string;
  size?: AutocompleteProps['size'];
  isLoading?: boolean;
}

export const SearchInput = <T extends { name: string }>({
  data,
  getItemUrl,
  renderItem,
  labelText,
  emptyContentText,
  size = 'sm',
  isLoading = false,
}: SearchInputProps<T>) => {
  const searchData = useMemo(() => data ?? [], [data]);

  const {
    isLoadingInput,
    items,
    selectedKey,
    onInputChange,
    onSelectionChange,
  } = useSearchInput<T>({
    data: searchData,
    getItemUrl,
  });

  const hasSpinner = isLoading || isLoadingInput;

  return (
    <div className="flex items-center gap-4 w-full justify-center">
      <Autocomplete
        allowsCustomValue
        fullWidth
        size={size}
        label={labelText}
        listboxProps={{
          emptyContent: emptyContentText,
        }}
        isDisabled={isLoading || isLoadingInput}
        variant="bordered"
        selectedKey={selectedKey}
        defaultItems={items}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      >
        {renderItem}
      </Autocomplete>

      {hasSpinner && <Spinner size="sm" color="white" />}
    </div>
  );
};
