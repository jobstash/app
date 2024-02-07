import { memo } from 'react';

import { REPORT_UI_CTX } from '@jobstash/shared/core';

import { CardMenu, Heading, ReportMenuItem, Text } from '@jobstash/shared/ui';

interface Props {
  name: string;
  description: string;
}

const RightPanelOrgCardHeader = ({ name, description }: Props) => (
  <>
    <div className="flex h-fit w-full items-center justify-between gap-2 relative">
      <Heading size="md" fw="semibold">
        {name}
      </Heading>
      <CardMenu>
        <ReportMenuItem ui={REPORT_UI_CTX.ORG_DETAILS_CARD} />
      </CardMenu>
    </div>

    <hr className="border-t border-white/10" />

    <div>
      <Text color="dimmed">{description}</Text>
    </div>
  </>
);

export default memo(RightPanelOrgCardHeader);
