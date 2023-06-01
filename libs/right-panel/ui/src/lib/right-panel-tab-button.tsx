import { memo } from 'react';

import { getFrontendUrl } from '@jobstash/shared/utils';

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

  const frontendUrl = getFrontendUrl();

  const paramsStr = typeof window === 'undefined' ? '' : window.location.search;

  const url = new URL(`${frontendUrl}/jobs/${slug}/${assignedTab}${paramsStr}`);

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
