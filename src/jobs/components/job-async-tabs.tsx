'use client';

import { useMemo } from 'react';

import { ROUTE_TABS } from '~/shared/core/constants';
import { getPluralText } from '~/shared/utils/get-plural-text';
import { DetailsPanelTabSkeleton } from '~/shared/components/details-panel/tab';
import { DetailsPanelTabMapper } from '~/shared/components/details-panel/tab-mapper';

import { JobDetails } from '~/jobs/core/schemas';
import { createJobPrefixedTabs } from '~/jobs/utils/create-job-prefixed-tabs';
import { useOrgDetails } from '~/orgs/hooks/use-org-details';
import { useCompetitors } from '~/projects/hooks/use-competitors';

interface Props {
  job: JobDetails;
}

export const AsyncTabs = ({ job }: Props) => {
  const {
    organization: { orgId, projects },
  } = job;
  const hasProject = projects.length > 0;

  // Org Details (for other-jobs count)
  const {
    data: org,
    isPending: isPendingOrg,
    error: orgError,
  } = useOrgDetails(orgId);

  // Competitors
  const {
    data: competitors,
    isPending: isPendingCompetitors,
    error: competitorsError,
  } = useCompetitors(hasProject ? projects[0].id : undefined);

  const tabs = useMemo(() => {
    const tabs: { text: string; href: string }[] = [];

    // Other-jobs count
    const jobCount = org?.jobs.length ?? 0;
    if (jobCount > 0) {
      tabs.push({
        text: `Other Jobs (${jobCount})`,
        href: `/${ROUTE_TABS.JOBS.OTHER_JOBS}`,
      });
    }

    // Competitors count
    const competitorCount = competitors?.data.length ?? 0;
    if (competitorCount > 0) {
      const competitorsText = getPluralText('Competitor', competitorCount);
      const countText = ` (${competitorCount})`;
      tabs.push({
        text: `${competitorsText}${countText}`,
        href: `/${ROUTE_TABS.JOBS.COMPETITORS}`,
      });
    }

    return createJobPrefixedTabs(job.shortUUID, tabs);
  }, [competitors?.data.length, job.shortUUID, org?.jobs.length]);

  // Show skeleton until both queries are complete
  if (isPendingOrg || (isPendingCompetitors && hasProject))
    return <DetailsPanelTabSkeleton />;

  // Error UI
  if (orgError || competitorsError) return <p>TODO: Error UI</p>;

  return <DetailsPanelTabMapper tabs={tabs} />;
};
