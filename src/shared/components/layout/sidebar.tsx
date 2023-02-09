/* eslint-disable no-alert */

import { useRouteSegments } from '~/shared/hooks';

import { Avatar } from '../base/avatar';
import { Bartab } from '../base/bartab';
import { Brand } from '../base/brand';
import { Text } from '../base/text';

import { bookmarkedTabs, discoverTabs } from './constants';
import type { SidebarTab } from './types';

// * NOTE: replace the routes with data from bff
// * (or probably from most recent active post per section)
const guaranteedSectionRoutesMap: Record<SidebarTab['baseHref'], string> = {
  '/jobs': '/jobs/uniswap-labs-senior-frontend-engineer-12345/details',
  '/organizations': '/organizations/uniswap-labs/details',
  '/projects': '/projects/uniswap-uni/details',
  '/repositories': '/repositories/uniswap-interface/details',
  '/bookmarks/jobs': '/TODO',
  '/bookmarks/orgs': '/TODO',
};

const DiscoverTabs = () => {
  const {
    push,
    segments: { section },
  } = useRouteSegments();

  return (
    <div className="mt-12">
      <Text htmlTag="h2" size="sm" fw="regular" className="text-sidebarTitle">
        Discover
      </Text>
      <div className="space-y-3 pt-3">
        {discoverTabs.map(({ label, baseHref, left }) => (
          <div key={label}>
            <Bartab
              isActive={`/${section}` === baseHref}
              left={left}
              text={label}
              intent="secondary"
              onClick={() => {
                push(guaranteedSectionRoutesMap[baseHref], { shallow: true });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const BookmarkedTab = () => (
  <div className="mt-12">
    <Text htmlTag="h2" size="sm" fw="regular" className="text-sidebarTitle">
      Bookmarked
    </Text>
    <div className="space-y-3 pt-3">
      {bookmarkedTabs.map((nav) => (
        <div key={nav.label}>
          <Bartab
            left={nav.left}
            text={nav.label}
            intent="secondary"
            onClick={() => alert('TODO')}
          />
        </div>
      ))}
    </div>
  </div>
);

const UserTab = () => (
  <div className="absolute bottom-0 pb-4">
    <Text
      htmlTag="h2"
      size="sm"
      fw="regular"
      className="pb-3 text-sidebarTitle"
    >
      Your Profile
    </Text>
    <Bartab
      intent="secondary"
      left={null}
      text="My Repositories"
      onClick={() => alert('TODO')}
    />

    <hr />

    <Bartab
      intent="secondary"
      left={<Avatar src="/user/@OxDevoor.png" alt="LoggedIn User" size="xs" />}
      text="@OxDevoor"
      onClick={() => alert('TODO')}
    />
  </div>
);

export const SideBar = () => (
  <nav className="fixed inset-y-0 flex min-h-screen flex-col p-4">
    <div>
      <Brand />
      <DiscoverTabs />
    </div>
    <div>
      <BookmarkedTab />
    </div>
    <div>
      <UserTab />
    </div>
  </nav>
);
