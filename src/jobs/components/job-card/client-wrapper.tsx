'use client';

import { useAtom } from 'jotai';

import { cn } from '~/shared/utils/cn';

import { activeJobIdAtom } from '~/jobs/atoms/active-job-id-atom';

interface Props {
  id: string;
  children: React.ReactNode;
}

export const JobCardClientWrapper = ({ id, children }: Props) => {
  const [activeJobId, setActiveJobId] = useAtom(activeJobIdAtom);
  const isActive = id === activeJobId;

  const onClickCard = () => {
    setActiveJobId(id);
  };

  return (
    <div
      className={cn(
        'rounded-3xl bg-darkest-gray transition-all duration-300 hover:bg-darker-gray',
        {
          'bg-gradient-to-l from-primary to-secondary hover:brightness-125':
            isActive,
        },
      )}
      onClick={onClickCard}
    >
      {children}
    </div>
  );
};
