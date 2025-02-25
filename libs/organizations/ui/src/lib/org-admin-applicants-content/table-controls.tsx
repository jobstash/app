import { ChangeEvent } from 'react';

import { Input } from '@heroui/input';
import { Tab, Tabs } from '@heroui/tabs';
import { useAtom } from 'jotai';
import { Search } from 'lucide-react';

import { capitalize } from '@jobstash/shared/utils';

import { ApplicantActiveList, applicantsActiveListAtom } from './atoms';

const tabs = ['all', 'new', 'shortlisted', 'archived'];

interface Props {
  onChangeFilter: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TableControls = ({ onChangeFilter }: Props) => {
  const [activeList, setActiveList] = useAtom(applicantsActiveListAtom);

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="w-fit">
        <Input
          placeholder="Search applicants, work history, jobs, skills, etc."
          className="min-w-[360px]"
          classNames={{
            inputWrapper: 'pl-1.5 bg-content2 rounded-lg',
          }}
          startContent={<Search className="w-6 h-6 ml-1 mr-2" />}
          onChange={onChangeFilter}
        />
      </div>
      <Tabs
        aria-label="Applicant List"
        radius="sm"
        variant="light"
        classNames={{
          cursor: 'bg-content2',
        }}
        selectedKey={activeList}
        onSelectionChange={(key) => setActiveList(key as ApplicantActiveList)}
      >
        {tabs.map((tab) => (
          <Tab key={tab} title={capitalize(tab)} />
        ))}
      </Tabs>
    </div>
  );
};
