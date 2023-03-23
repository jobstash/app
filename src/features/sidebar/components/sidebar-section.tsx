import { Bartab, SidebarIcon, Text } from '~/shared/components';
import { RouteSegments } from '~/shared/core/interfaces';
import { RouterPush } from '~/shared/core/types';
import { useRouteSegments } from '~/shared/hooks';

import { type SidebarTab } from '../core/constants';

interface Props {
  title: string;
  tabs: SidebarTab[];
  isActiveFn: (
    tabs: SidebarTab,
    segments: RouteSegments,
    push: RouterPush,
  ) => boolean;
}

export const SidebarSection = ({ title, tabs, isActiveFn }: Props) => {
  const { segments, push } = useRouteSegments();

  return (
    <div className="mt-12">
      <Text htmlTag="h2" size="sm" fw="regular" className="text-sidebarTitle">
        {title}
      </Text>
      <div className="space-y-3 pt-3">
        {tabs.map((tab) => (
          <div key={tab.label}>
            <Bartab
              isActive={isActiveFn(tab, segments, push)}
              left={tab.icon ? <SidebarIcon filename={tab.icon} /> : null}
              text={tab.label}
              intent="secondary"
              onClick={() => {
                // Replace when discover links endpoint is implemented
                // push(__path_here__, { shallow: true });

                // eslint-disable-next-line no-alert
                alert('TODO');
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
