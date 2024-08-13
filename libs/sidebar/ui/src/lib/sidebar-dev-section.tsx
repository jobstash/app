import { cn } from '@jobstash/shared/utils';

import { useDevProfileInfoContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import SidebarBartab from './sidebar-bartab';

interface Props {
  isMobile?: boolean;
}

const SidebarDevSection = ({ isMobile }: Props) => {
  const { profileInfoData } = useDevProfileInfoContext();

  const tabs = [
    { text: 'Profile', path: '/profile', isExactPath: true },
    ...(profileInfoData?.username
      ? [{ text: 'Your Repositories', path: '/profile/repositories' }]
      : []),
    { text: 'Organization Reviews', path: '/profile/reviews' },
  ];

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

export default SidebarDevSection;
