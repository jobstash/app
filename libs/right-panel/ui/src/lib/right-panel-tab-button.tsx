import { memo } from 'react';

import { LinkButton } from '@jobstash/shared/ui';

interface Props {
  text: string;
  currentTab: string;
  tabSegment: string;
  href: string;
}

const RightPanelTabButton = ({ text, currentTab, tabSegment, href }: Props) => (
  <LinkButton
    isActive={tabSegment === currentTab}
    variant="outline"
    size="md"
    linkProps={{ href, scroll: false }}
  >
    {text}
  </LinkButton>
);

export default memo(RightPanelTabButton);
