import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';

import { JobApplicant } from '@jobstash/jobs/core';

import { Text } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  items: JobApplicant['job'][];
  inputValue: string;
  selectedKey: string | null;
  onInputChange: (_: string) => void;
  onSelectionChange: (_: React.Key) => void;
}

export const JobSelection = (props: Props) => {
  const {
    isLoading,
    items,
    inputValue,
    selectedKey,
    onInputChange,
    onSelectionChange,
  } = props;

  return (
    <Autocomplete
      className="max-w-xs"
      listboxProps={{
        emptyContent: 'Type atleast 2 letters to show results',
      }}
      placeholder="Select Job"
      isLoading={isLoading}
      isDisabled={isLoading}
      items={items}
      inputValue={inputValue}
      selectedKey={selectedKey}
      aria-label="Job Selection Filter"
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
    >
      {({ shortUUID, title, classification }) => (
        <AutocompleteItem key={shortUUID} textValue={title}>
          <div className="flex flex-col gap-2">
            <Text size="md" fw="bold">
              {title}
            </Text>
            <Text size="sm" color="dimmed">
              {classification}
            </Text>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
