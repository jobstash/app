import { memo } from 'react';

import { type Technology } from '@jobstash/shared/core';

import { Heading, TechWrapper, Text } from '@jobstash/shared/ui';

interface Props {
  technologies: Technology[];
}

const RightPanelJobCardTechnologies = ({ technologies }: Props) => {
  if (technologies.length === 0) return null;

  return (
    <>
      <div className="flex h-8 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Technologies
          </Heading>
          <Text color="dimmed">
            Technologies that are required to be successful at the job
          </Text>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech) => (
          <TechWrapper key={tech.id} id={tech.id}>
            {tech.name}
          </TechWrapper>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelJobCardTechnologies);
