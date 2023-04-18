import { memo } from 'react';

import { Button, TechWrapper } from '~/shared/components';
import { Technology } from '~/shared/core/interfaces';

interface Props {
  techs: Technology[];
}

const JobCardTechs = ({ techs }: Props) => {
  if (techs.length === 0) return null;

  return (
    <>
      <div className="flex h-4 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {techs.map(({ name, id }) => (
            <TechWrapper key={id} id={id}>
              {name}
            </TechWrapper>
          ))}
        </div>
        <div className="z-30 shrink-0 self-center">
          <Button variant="translucent">Sign Up to See Matches</Button>
        </div>
      </div>
    </>
  );
};

export default memo(JobCardTechs);
