import { type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { useProfileSkillsContext } from '@jobstash/profile/state';

interface Props {
  children: ReactNode;
}

const SkillsWrapper = ({ children }: Props) => {
  const { isLoading } = useProfileSkillsContext();

  return (
    <>
      <div>
        <hr className="border-t border-white/10" />
      </div>

      <div className="items-center justify-between lg:flex">
        <div
          className={cn('flex flex-wrap gap-4', {
            'opacity-40 pointer-events-none':
              isLoading.mutation || isLoading.query,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SkillsWrapper;
