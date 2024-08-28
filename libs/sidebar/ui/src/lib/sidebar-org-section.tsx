import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { ATS_PROVIDERS } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import { useATSClient } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

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

  const wrapperClassName = cn('space-y-2 pt-3', {
    'flex flex-col justify-start items-start [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent':
      isMobile,
  });

  return (
    <div className="flex-col">
      <Text color="dimmed">Your Profile</Text>
      <div className={wrapperClassName}>
        {tabs.map(({ path, text, isExactPath }) => (
          <SidebarBartab
            key={text}
            isMobile={isMobile}
            path={path}
            text={text}
            isExactPath={isExactPath}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarOrgSection;
