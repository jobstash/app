'use client';

import { Select, SelectItem } from '@nextui-org/select';

import { SingleSelectProps } from './types';
import { useSingleSelectInput } from './use-single-select-input';

export const SingleSelectInput = (props: SingleSelectProps) => {
  const { label, selectedKeys, options, onChange } =
    useSingleSelectInput(props);

  return (
    <Select
      size="sm"
      label={label}
      classNames={{
        trigger: 'bg-darkest-gray',
      }}
      selectedKeys={selectedKeys}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <SelectItem key={label} value={value.toString()}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
};
