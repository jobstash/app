'use client';

import { ROUTE_TABS } from '~/shared/core/constants';
import { getPluralText } from '~/shared/utils/get-plural-text';
import {
  DetailsPanelTabs,
  DetailsPanelTabsSkeleton,
} from '~/shared/components/details-panel/tabs';

import { JobDetails } from '~/jobs/core/schemas';
import { createJobPrefixedTabs } from '~/jobs/utils/create-job-prefixed-tabs';
import { useJobDetails } from '~/jobs/hooks/use-job-details';

import { AsyncTabs } from './job-async-tabs';

interface Props {
  id: string;
}

export const JobTabs = ({ id }: Props) => {
  const { data } = useJobDetails(id);

  if (!data) return <DetailsPanelTabsSkeleton />;

  const tabs = createTabs(data);

  return <DetailsPanelTabs tabs={tabs} asyncTabs={<AsyncTabs job={data} />} />;
};

const DEFAULT_TABS = [
  { text: 'Job Details', href: `/${ROUTE_TABS.SHARED.DETAILS}` },
  { text: 'Organization', href: `/${ROUTE_TABS.SHARED.ORG}` },
];

const createTabs = (job: JobDetails) => {
  const {
    shortUUID,
    organization: { projects },
  } = job;

  const tabs = [...DEFAULT_TABS];

  const projectCount = projects.length;
  if (projectCount > 0) {
    const projectText = getPluralText('Project', projectCount);
    const countText = ` (${projectCount})`;
    tabs.push({
      text: `${projectText}${countText}`,
      href: `/${ROUTE_TABS.JOBS.PROJECTS}`,
    });
  }

  return createJobPrefixedTabs(shortUUID, tabs);
};
