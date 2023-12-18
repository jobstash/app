import { useAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import { TAB_SEGMENT } from '@jobstash/shared/core';
import { getPluralText } from '@jobstash/shared/utils';

import { activeJobBookmarkTabAtom } from '@jobstash/jobs/state';

import { Button, Spinner } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
  showSpinner: boolean;
  competitorCount: number;
}

const JobBookmarksRightPanelTabs = ({
  jobPost,
  showSpinner,
  competitorCount,
}: Props) => {
  const { organization } = jobPost;

  const { projects } = organization;
  const projectCount = projects.length;

  const [currentTab, setCurrentTab] = useAtom(activeJobBookmarkTabAtom);
  const onClickTab = (tabSegment: TabSegment) => {
    setCurrentTab(tabSegment);
  };

  const tabs: BookmarkTab[] = [
    {
      text: 'Job Details',
      tabSegment: TAB_SEGMENT.details,
    },
    {
      text: 'Organization',
      tabSegment: TAB_SEGMENT.organization,
    },
  ];

  if (projectCount) {
    tabs.push({
      text: `${getPluralText('Project', projectCount)} (${projectCount})`,
      tabSegment: TAB_SEGMENT.projects,
    });
  }

  if (competitorCount) {
    tabs.push({
      text: `${getPluralText('Competitor', projectCount)} (${competitorCount})`,
      tabSegment: TAB_SEGMENT.competitors,
    });
  }

  return (
    <div className="flex items-center flex-wrap gap-4 border-t border-white/10 pt-8">
      {tabs.map(({ text, tabSegment }) => (
        <Button
          key={text}
          isActive={tabSegment === currentTab}
          onClick={() => onClickTab(tabSegment)}
        >
          {text}
        </Button>
      ))}
      {showSpinner && <Spinner />}
    </div>
  );
};

export default JobBookmarksRightPanelTabs;

type TabSegment = typeof TAB_SEGMENT[keyof typeof TAB_SEGMENT];
interface BookmarkTab {
  text: string;
  tabSegment: TabSegment;
}
