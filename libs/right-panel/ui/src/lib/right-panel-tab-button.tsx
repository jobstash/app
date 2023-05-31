import { memo } from 'react';

import { NEXT_PUBLIC_FRONTEND_URL } from '@jobstash/shared/core';

import { LinkButton } from '@jobstash/shared/ui';

interface Props {
  text: string;
  currentTab: string;
  assignedTab: string;
  slug: string;
}

const RightPanelTabButton = ({
  text,
  currentTab,
  assignedTab,
  slug,
}: Props) => {
  const isActive = assignedTab === currentTab;

  const paramsStr = typeof window === 'undefined' ? '' : window.location.search;

  const url = new URL(
    `${NEXT_PUBLIC_FRONTEND_URL}/jobs/${slug}/${assignedTab}${paramsStr}`,
  );

  return (
    <LinkButton
      isActive={isActive}
      variant="outline"
      size="md"
      linkProps={{ href: url.toString(), scroll: false }}
    >
      {text}
    </LinkButton>
  );
};

export default memo(RightPanelTabButton);
