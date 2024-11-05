import { useMemo } from 'react';

import { getPluralText, normalizeString } from '@jobstash/shared/utils';

import { useAffiliatedOrgs, useAuthContext } from '@jobstash/auth/state';

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

  const tabs: SidebarBartabProps[] = useMemo(() => {
    if (!orgs) return [];

    return [
      ...orgs.map(({ id, name }) => ({
        text: name,
        path: `/profile/organizations/${normalizeString(name)}`,
      })),
      {
        text: 'Available Talents',
        path: '/profile/org/talents',
      },
      {
        text: 'Candidate Report',
        path: '/candidate-report',
      },
    ];
  }, [orgs]);

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
