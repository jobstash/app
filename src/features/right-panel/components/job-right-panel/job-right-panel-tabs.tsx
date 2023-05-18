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
  projectCount: number;
  onClickTab: (_: string) => void;
  repoCount?: number;
  competitorsCount?: number;
}

const JobRightPanelTabs = ({
  tab,
  isPending,
  projectCount,
  onClickTab,
  repoCount = 0,
  competitorsCount = 0,
}: Props) => {
  const tabButtons = [
    { text: 'Job Details', tabSegment: TEXT_ROUTE_TAB_DETAILS },
    { text: 'Organization', tabSegment: TEXT_ROUTE_TAB_ORGANIZATION },
  ];
  if (projectCount > 0) {
    tabButtons.push({
      text: `Project${projectCount > 1 ? 's' : ''} (${projectCount})`,
      tabSegment: TEXT_ROUTE_TAB_PROJECT,
    });
  }

  if (repoCount > 0) {
    tabButtons.push({
      text: `Repositories${repoCount > 0 ? ' (' + repoCount + ')' : ''}`,
      tabSegment: TEXT_ROUTE_TAB_REPOSITORIES,
    });
  }

  if (competitorsCount > 0) {
    tabButtons.push({
      text: `Competitors${
        competitorsCount > 0 ? ' (' + competitorsCount + ')' : ''
      }`,
      tabSegment: TEXT_ROUTE_TAB_COMPETITORS,
    });
  }

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
