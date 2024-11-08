import { useMemo } from 'react';

import { getPluralText, normalizeString } from '@jobstash/shared/utils';

import { useAffiliatedOrgs, useAuthContext } from '@jobstash/auth/state';
import { useAffiliationRequests } from '@jobstash/profile/state';

import { SidebarBartabProps } from './sidebar-bartab';
import { SidebarSection, SidebarSectionSkeleton } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarOrgSection = ({ isMobile }: Props) => {
  const { isLoading: isLoadingAuth } = useAuthContext();
  const { data: orgs, isLoading: isLoadingAffiliatedOrgs } =
    useAffiliatedOrgs();
  const isLoading = isLoadingAuth || isLoadingAffiliatedOrgs;

  const { data: approvedAffiliations } = useAffiliationRequests({
    list: 'approved',
  });

  const tabs: SidebarBartabProps[] = useMemo(() => {
    if (!orgs) return [];

    // Only allow approved orgs to be displayed
    const approvedOrgIds = approvedAffiliations?.map((org) => org.orgId) ?? [];
    const approvedOrgs = orgs.filter((org) => approvedOrgIds.includes(org.id));

    const result = approvedOrgs.map(({ name }) => ({
      text: name,
      path: `/profile/organizations/${normalizeString(name)}`,
    }));

    if (result.length > 0) {
      result.push(
        {
          text: 'Available Talents',
          path: '/profile/organizations/available-talents',
        },
        {
          text: 'Candidate Report',
          path: '/profile/organizations/candidate-report',
        },
      );
    }

    return result;
  }, [approvedAffiliations, orgs]);

  if (isLoading) return <SidebarSectionSkeleton />;

  return (
    <SidebarSection
      isMountedWrapped
      title={`Your ${getPluralText('Organization', (orgs ?? []).length)}`}
      isMobile={isMobile}
      bartabs={tabs}
    />
  );
};

export default SidebarOrgSection;
