import { TAB_SEGMENT } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

const projectTabs = [TAB_SEGMENT.details, TAB_SEGMENT.organization];
const projectTabsSet = new Set(projectTabs);

export const createProjectPageTitle = (projectName: string, tab: string) => {
  const isProjectTab = projectTabsSet.has(tab as typeof projectTabs[number]);

  const defaultTitle = `${projectName} Project`;

  if (!isProjectTab) return defaultTitle;

  return `${defaultTitle} ${capitalize(tab)}`;
};
