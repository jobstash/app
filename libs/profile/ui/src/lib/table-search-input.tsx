import { Dispatch, SetStateAction } from 'react';

import { Input } from "@heroui/input";

import { SearchInputIcon } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  isDisabled?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (_: string) => void;
}

export const TableSearchInput = ({
  value,
  isLoading,
  isDisabled,
  setValue,
  onChange,
}: Props) => (
  <Input
    isClearable
    placeholder="Search applicant, job title, location ..."
    size="sm"
    value={value}
    classNames={{
      base: 'w-80',
      inputWrapper: ['bg-darker-gray'],
      input: 'pl-2',
    }}
    startContent={<SearchInputIcon />}
    isDisabled={isLoading || (isDisabled && !value)}
    onClear={() => setValue('')}
    onValueChange={onChange}
  />
);
