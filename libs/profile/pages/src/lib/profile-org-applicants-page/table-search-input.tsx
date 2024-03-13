import { Dispatch, SetStateAction } from 'react';

import { Input } from '@nextui-org/input';

import { SearchInputIcon } from '@jobstash/shared/ui';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (_: string) => void;
}

export const TableSearchInput = ({ value, setValue, onChange }: Props) => (
  <Input
    isClearable
    placeholder="Search Organization"
    size="sm"
    value={value}
    classNames={{
      base: 'w-96',
      inputWrapper: ['bg-darker-gray'],
      input: 'pl-2',
    }}
    startContent={<SearchInputIcon />}
    onClear={() => setValue('')}
    onValueChange={onChange}
  />
);
