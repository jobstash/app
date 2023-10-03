import { memo } from 'react';

import { type Tag } from '@jobstash/shared/core';

import { Heading, TechWrapper, Text } from '@jobstash/shared/ui';

interface Props {
  tags: Tag[];
}

const RightPanelJobCardTags = ({ tags }: Props) => {
  if (tags.length === 0) return null;

  return (
    <>
      <div className="flex h-8 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Heading size="sm" fw="semibold">
            Tags
          </Heading>
          <Text color="dimmed">
            Tags that are required to be successful at the job
          </Text>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tech) => (
          <TechWrapper key={tech.id} id={tech.id}>
            {tech.name}
          </TechWrapper>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelJobCardTags);
