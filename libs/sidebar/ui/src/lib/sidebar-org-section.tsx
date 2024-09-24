import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { ATS_PROVIDERS } from '@jobstash/profile/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useATSClient } from '@jobstash/profile/state';

import { SidebarSection } from './sidebar-section';

interface Props {
  isMobile?: boolean;
}

const SidebarOrgSection = ({ isMobile }: Props) => {
  const { flow, isLoading: isLoadingAuth } = useAuthContext();
  const { data: atsClient, isPending: isPendingATSClient } = useATSClient();

  const isLoading = isLoadingAuth || isPendingATSClient;

  if (isLoading) return null;

  const tabs: { text: string; path: string; isExactPath?: boolean }[] = [];
  tabs.push({
    text: `${flow === CHECK_WALLET_FLOWS.ORG_PROFILE ? 'Setup ' : ''}Profile`,
    path: '/profile',
    isExactPath: true,
  });

  if (flow === CHECK_WALLET_FLOWS.ORG_COMPLETE) {
    tabs.push({
      text: 'ATS Settings',
      path: '/profile/org/ats-settings',
    });

    if (atsClient && atsClient.name === ATS_PROVIDERS.JOBSTASH.platformName) {
      tabs.push({
        text: 'Applicants',
        path: '/profile/org/applicants',
      });
    }

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
  }

  return (
    <SidebarSection title="Your Profile" isMobile={isMobile} bartabs={tabs} />
  );
};

export default SidebarOrgSection;
