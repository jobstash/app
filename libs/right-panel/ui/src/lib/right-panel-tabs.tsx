import { memo } from 'react';

import { type Competitor } from '@jobstash/competitors/core';
import { type JobPost } from '@jobstash/jobs/core';

import RightPanelTabButton from './right-panel-tab-button';

interface TabButton {
  text: string;
  assignedTab:
    | 'details'
    | 'organization'
    | 'projects'
    | 'competitors'
    | 'repositories';
}

interface Props {
  isLoading: boolean;
  jobPost: JobPost;
  slug: string;
  currentTab: string;
  competitors: Competitor[];
}

const RightPanelTabs = ({
  isLoading,
  jobPost,
  slug,
  currentTab,
  competitors,
}: Props) => {
  const tabButtons: TabButton[] = [
    { text: 'Job Details', assignedTab: 'details' },
    { text: 'Organization', assignedTab: 'organization' },
  ];

  const {
    organization: { projects },
  } = jobPost;

  const projectsLength = projects.length;
  const hasProject = projectsLength > 0;

  if (hasProject) {
    tabButtons.push({
      text: `Project${projectsLength > 1 ? 's' : ''} (${projectsLength})`,
      assignedTab: 'projects',
    });
  }

  const competitorsLength = competitors?.length ?? 0;
  if (competitorsLength) {
    tabButtons.push({
      text: `Competitors${
        competitorsLength > 0 ? ' (' + competitorsLength + ')' : ''
      }`,
      assignedTab: 'competitors',
    });
  }

  // TODO: Repositories Tab Button

  return (
    <div className="flex items-center flex-wrap space-x-2 border-t border-white/10 pt-8">
      {tabButtons.map(({ text, assignedTab }) => (
        <RightPanelTabButton
          key={text}
          slug={slug}
          assignedTab={assignedTab}
          text={text}
          currentTab={currentTab}
        />
      ))}
      {isLoading && (
        <div className="pl-1 flex items-center">
          <div
            className="animate-spin2 opacity-40 inline-block w-5 h-5 border-2 border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(RightPanelTabs);
