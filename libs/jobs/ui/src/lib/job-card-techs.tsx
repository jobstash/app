import { memo } from 'react';

import { type Tag } from '@jobstash/shared/core';

import { TechWrapper } from '@jobstash/shared/ui';

interface Props {
  techs: Tag[];
}

const JobCardTechs = ({ techs }: Props) => {
  if (techs.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="items-center justify-between lg:flex py-1">
        <div className="flex flex-wrap gap-2">
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
