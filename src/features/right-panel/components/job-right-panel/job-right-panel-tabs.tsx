import { memo } from 'react';

import { Button } from '~/shared/components';
import {
  TEXT_ROUTE_TAB_COMPETITORS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECT,
  TEXT_ROUTE_TAB_REPOSITORIES,
} from '~/shared/core/constants';

interface Props {
  tab: string;
  isPending: boolean;
  hasProject: boolean;
  onClickTab: (_: string) => void;
}

const JobRightPanelTabs = ({
  tab,
  isPending,
  hasProject,
  onClickTab,
}: Props) => {
  const tabButtons = [
    { text: 'Job Details', tabSegment: TEXT_ROUTE_TAB_DETAILS },
    { text: 'Organization', tabSegment: TEXT_ROUTE_TAB_ORGANIZATION },
  ];
  if (hasProject) {
    tabButtons.push({ text: 'Project', tabSegment: TEXT_ROUTE_TAB_PROJECT });
  }

  // Temporary (WIP)
  tabButtons.push(
    { text: 'Repositories (TBD)', tabSegment: TEXT_ROUTE_TAB_REPOSITORIES },
    { text: 'Competitors (TBD)', tabSegment: TEXT_ROUTE_TAB_COMPETITORS },
  );

  return (
    <div className="mt-8 flex flex-wrap space-x-2 border-t border-white/10 pt-8">
      {tabButtons.map(({ text, tabSegment }) => (
        <Button
          key={text}
          variant="outline"
          isActive={tab === tabSegment}
          size="md"
          isDisabled={isPending}
          onClick={() => onClickTab(tabSegment)}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default memo(JobRightPanelTabs);
