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
      <hr className="border-t border-white/10" />
      <div className="items-center justify-between lg:flex">
        <div className="flex flex-wrap gap-4">
          {techs.map(({ name, id }) => (
            <TechWrapper key={id} id={id}>
              {name}
            </TechWrapper>
          ))}
        </div>
        {/* <div className="z-30 shrink-0 self-start">
          <Button variant="translucent">Sign Up to See Matches</Button>
        </div> */}
      </div>
    </>
  );
};

export default memo(JobCardTechs);
