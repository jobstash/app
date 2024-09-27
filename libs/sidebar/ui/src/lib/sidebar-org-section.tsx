import { getPluralText, normalizeString } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { SidebarBartabProps } from './sidebar-bartab';
import { SidebarSection } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarOrgSection = ({ isMobile }: Props) => {
  const { isLoading, orgs } = useAuthContext();

  if (isLoading) return null;

  const tabs: SidebarBartabProps[] = orgs.map(({ id, name }) => ({
    text: name,
    path: `/profile/organizations/${normalizeString(name)}`,
  }));

  tabs.push(
    {
      text: 'Available Talents',
      path: '/profile/org/talents',
    },
    {
      text: 'Candidate Report',
      path: '/candidate-report',
    },
  );

  return (
    <SidebarSection
      isMountedWrapped
      title={`Your ${getPluralText('Organization', orgs.length)}`}
      isMobile={isMobile}
      bartabs={tabs}
    />
  );
};

export default SidebarOrgSection;
