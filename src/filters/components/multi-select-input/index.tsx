'use client';

import { Select, SelectItem } from '@nextui-org/select';

import { MultiSelectInputProps } from './types';
import { useMultiSelectInput } from './use-multi-select-input';

export const MultiSelectInput = (props: MultiSelectInputProps) => {
  const { labelText, value, onSelectionChange, options } =
    useMultiSelectInput(props);

  return (
    <Select
      size="sm"
      label={labelText}
      selectionMode="multiple"
      classNames={{
        trigger: 'bg-darkest-gray',
      }}
      selectedKeys={value}
      onSelectionChange={onSelectionChange}
    >
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};
