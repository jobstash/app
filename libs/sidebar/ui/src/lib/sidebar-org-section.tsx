import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

interface Props {
  isMobile?: boolean;
}
const tabs = [
  {
    text: 'Profile',
    path: '/profile',
  },
];

const SidebarOrgSection = ({ isMobile }: Props) => {
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
