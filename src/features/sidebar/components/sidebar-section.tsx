import { Bartab, SidebarIcon, Text } from '~/shared/components';
import { useRouteSegments } from '~/shared/hooks';

import type { IsActiveFn, SidebarTab } from '../core/types';

interface Props {
  title: string;
  tabs: SidebarTab[];
  isActiveFn: IsActiveFn;
}

export const SidebarSection = ({ title, tabs, isActiveFn }: Props) => {
  const { segments, push, aspath } = useRouteSegments();

  return (
    <div className="mt-12">
      <Text htmlTag="h2" size="sm" fw="regular" className="text-sidebarTitle">
        {title}
      </Text>
      <div className="space-y-3 pt-3">
        {tabs.map((tab) => (
          <div key={tab.label}>
            <Bartab
              isActive={isActiveFn({ tab, segments, push, aspath })}
              left={tab.icon ? <SidebarIcon filename={tab.icon} /> : null}
              text={tab.label}
              intent="secondary"
              onClick={() => {
                // Replace when discover links endpoint is implemented
                // push(__path_here__, { shallow: true });

                // eslint-disable-next-line no-alert
                tab.path ? push(tab.path, { shallow: true }) : alert('TODO');
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
