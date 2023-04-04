import { ReactNode } from 'react';

import { RouteSegments } from '~/shared/core/interfaces';
import { RouterPush } from '~/shared/core/types';

export type SidebarTab = {
  icon: ReactNode;
  label: string;
  path?: string;
};

type IsActiveFnOptions = {
  tab: SidebarTab;
  segments: RouteSegments;
  push: RouterPush;
  aspath: string;
};

export type IsActiveFn = (options: IsActiveFnOptions) => boolean;

export type SidebarRoleSection = null | {
  title: string;
  tabs: SidebarTab[];
  isActiveFn: IsActiveFn;
};
