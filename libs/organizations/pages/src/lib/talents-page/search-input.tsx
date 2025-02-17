import { ChangeEvent } from 'react';

import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';

interface Props {
  onChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ onChangeFilter }: Props) => (
  <div className="w-fit">
    <Input
      placeholder="Search talents, work history, skills, etc."
      className="min-w-[360px]"
      classNames={{
        inputWrapper: 'pl-1.5 bg-content2 rounded-lg',
      }}
      startContent={<Search className="w-6 h-6 ml-1 mr-2" />}
      onChange={onChangeFilter}
    />
  </div>
);
