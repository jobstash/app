import { useMemo } from 'react';

import { Autocomplete, AutocompleteProps, Spinner } from '@nextui-org/react';

import { useSearchInput } from '../hooks/use-search-input';

interface SearchInputProps<T> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  labelText: string;
  emptyContentText: string;
  size?: AutocompleteProps['size'];
  isLoading?: boolean;
  onSelect: (item: T) => void;
  showSpinnerOnSelect?: boolean;
  clearSelectionOnSelect?: boolean;
  variant?: AutocompleteProps['variant'];
}

export const SearchInput = <T extends { name: string }>({
  data,
  renderItem,
  labelText,
  emptyContentText,
  size = 'sm',
  isLoading = false,
  onSelect,
  showSpinnerOnSelect,
  clearSelectionOnSelect,
  variant = 'bordered',
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
    onSelect,
    showSpinnerOnSelect,
    clearSelectionOnSelect,
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
        variant={variant}
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
