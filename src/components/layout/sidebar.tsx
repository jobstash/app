/* eslint-disable no-alert */
import type { Listing } from '~/core/interfaces';
import type { RouterPush } from '~/core/types';
import { slugify } from '~/utils/slugify';

import { Avatar } from '../base/avatar';
import { Bartab } from '../base/bartab';
import { Brand } from '../base/brand';
import { Text } from '../base/text';

import { bookmarkedTabs, discoverTabs } from './constants';
import type { SidebarTabs } from './types';

const getRouteId = (baseHref: SidebarTabs['baseHref'], listing: Listing) => {
  const routeMap: Record<SidebarTabs['baseHref'], string> = {
    '/jobs': listing.jobs[0].id,
    '/organizations': slugify(listing.org.name),
    '/projects': 'TODO',
    '/repositories': 'TODO',
    '/bookmarks/jobs': 'TODO',
    '/bookmarks/orgs': 'TODO',
  };

  return routeMap[baseHref];
};


export const DiscoverTabs = (props: {
  section: string;
  // Comment unused props
  // listing: Listing;
  // push: RouterPush;
}) => (
  <div className="mt-12">
    <Text htmlTag="h2" size="sm" fw="regular" className="text-sidebarTitle">
      Discover
    </Text>
    <div className="space-y-3 pt-3">
      {discoverTabs.map((nav) => (
        <div key={nav.label}>
          <Bartab
            isActive={`/${props.section}` === nav.baseHref}
            left={nav.left}
            text={nav.label}
            intent="secondary"
            onClick={() =>
              null
            }
          />
        </div>
      ))}
    </div>
  </div>
);

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
    <Text htmlTag="h2" size="sm" fw="regular" className="pb-3 text-sidebarTitle">
      Your Profile
    </Text>
    <Bartab intent="secondary"  left={null} text="My Repositories" onClick={() => alert('TODO')} />
    <hr className="my-5 h-px border-0 bg-white/20" />
    <Bartab
      intent="secondary"
      left={<Avatar src="https://via.placeholder.com/150" alt="LoggedIn User" size="xs" />}
      text="@OxDevoor"
      onClick={() => alert('TODO')}
    />
  </div>
);

interface Props {
  section: string;
  push: RouterPush;
  listing: Listing;
}

export const SideBar = ({ section, push, listing }: Props) => (
  <nav className="fixed inset-y-0 flex min-h-screen flex-col p-4">
    <div className="">
      <Brand />
      <DiscoverTabs section={section} push={push} listing={listing} />
    </div>
    <div className="">
      <BookmarkedTab />
    </div>
    <div>
      <UserTab />
    </div>
  </nav>
);
