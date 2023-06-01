import { memo } from 'react';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  name: string;
  description: string;
}

const RightPanelOrgCardHeader = ({ name, description }: Props) => (
  <>
    <Heading size="md" fw="semibold">
      {name}
    </Heading>

    <div className="flex h-fit flex-col justify-center">
      <hr className="border-t border-white/10" />
    </div>

    <div>
      <Text color="dimmed">{description}</Text>
    </div>
  </>
);

export default memo(RightPanelOrgCardHeader);
