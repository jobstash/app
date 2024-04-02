'use client';

import { HREFS, ROUTE_TABS } from '~/shared/core/constants';
import { getPluralText } from '~/shared/utils/get-plural-text';
import {
  DetailsPanelTabs,
  DetailsPanelTabsSkeleton,
} from '~/shared/components/details-panel/tabs';

import { OrgDetails } from '~/orgs/core/schemas';
import { useOrgDetails } from '~/orgs/hooks/use-org-details';

interface Props {
  id: string;
}

export const OrgTabs = ({ id }: Props) => {
  const { data } = useOrgDetails(id);

  if (!data) return <DetailsPanelTabsSkeleton />;

  const tabs = createTabs(data);

  return <DetailsPanelTabs tabs={tabs} />;
};

const createTabs = (org: OrgDetails) => {
  const { projects, jobs } = org;

  const tabs = [
    { text: 'Organization Details', href: `/${ROUTE_TABS.SHARED.DETAILS}` },
  ];

  const projectCount = projects.length;
  if (projectCount > 0) {
    const projectText = getPluralText('Project', projectCount);
    const countText = ` (${projectCount})`;
    tabs.push({
      text: `${projectText}${countText}`,
      href: `/${ROUTE_TABS.ORGS.PROJECTS}`,
    });
  }

  const jobCount = jobs.length;
  if (jobCount > 0) {
    const jobText = getPluralText('Job', jobCount);
    const countText = ` (${jobCount})`;
    tabs.push({
      text: `${jobText}${countText}`,
      href: `/${ROUTE_TABS.ORGS.JOBS}`,
    });
  }

  tabs.push({
    text: 'Reviews',
    href: `/${ROUTE_TABS.ORGS.REVIEWS}`,
  });

  return tabs.map((tab) => ({
    ...tab,
    href: `${HREFS.ORGS_PAGE}/${org.orgId}${tab.href}`,
  }));
};
