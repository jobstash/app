import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { cn } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

interface Props {
  isMobile?: boolean;
}

const SidebarOrgSection = ({ isMobile }: Props) => {
  const { flow } = useAuthContext();

  const tabs: { text: string; path: string }[] = [];
  tabs.push({
    text: `${flow === CHECK_WALLET_FLOWS.ORG_PROFILE ? 'Setup ' : ''}Profile`,
    path: '/profile',
  });

  if (flow === CHECK_WALLET_FLOWS.ORG_COMPLETE) {
    tabs.push({
      text: 'Applicants',
      path: '/profile/org/applicants',
    });
  }

  const wrapperClassName = cn('space-y-2 pt-3', {
    'flex flex-col justify-start items-start [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent':
      isMobile,
  });

  return (
    <div className="flex-col">
      <Text color="dimmed">Your Profile</Text>
      <div className={wrapperClassName}>
        {tabs.map(({ path, text }) => (
          <SidebarBartab
            key={text}
            isMobile={isMobile}
            path={path}
            text={text}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarOrgSection;
