import { ChangeEvent } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Input } from '@nextui-org/react';

const DEFAULT_PLACEHOLDER = 'Filter Search';

interface Props {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const QuickFilterInput = ({
  placeholder = DEFAULT_PLACEHOLDER,
  onChange,
}: Props) => (
  <div className="w-fit">
    <Input
      size="sm"
      placeholder={placeholder}
      className="min-w-[320px]"
      classNames={{
        inputWrapper: 'pl-1.5 bg-[#282828]',
      }}
      startContent={<MagnifyingGlassIcon className="w-7 h-7 mr-1" />}
      onChange={onChange}
    />
  </div>
);
