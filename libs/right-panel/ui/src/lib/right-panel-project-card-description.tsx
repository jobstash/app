import { memo } from 'react';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  description: string;
}

const RightPanelProjectCardDescription = ({ description }: Props) => {
  if (!description) return null;

  return (
    <>
      <div className="flex h-2 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex flex-col gap-2">
        <Heading size="sm" fw="semibold">
          Description
        </Heading>
        <Text color="dimmed">{description}</Text>
      </div>
    </>
  );
};

export default memo(RightPanelProjectCardDescription);
