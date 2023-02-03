/* eslint-disable no-alert */
import type { Listing } from '~/core/interfaces';
import type { RouterPush } from '~/core/types';
import { slugify } from '~/utils/slugify';

import { Bartab } from '../unstyled-ui/bartab';
import { Avatar } from '../unstyled-ui/base/avatar';
import { Brand } from '../unstyled-ui/base/brand';
import { Text } from '../unstyled-ui/base/text';

import { bookmarkedTabs, discoverTabs } from './constants';
import type { SidebarTabs } from './types';

const getRouteId = (baseHref: SidebarTabs['baseHref'], listing: Listing) => {
  const routeMap: Record<SidebarTabs['baseHref'], string> = {
    '/jobs': listing.jobs[0].id,
    '/organizations': slugify(listing.org.name),
    '/projects': slugify(listing.projects[0].name),
    '/repositories': slugify(listing.repositories[0].name),
    '/bookmarks/jobs': 'TODO',
    '/bookmarks/orgs': 'TODO',
  };

  return routeMap[baseHref];
};

export const DiscoverTabs = (props: {
  section: string;
  listing: Listing;
  push: RouterPush;
}) => (
  <div className="space-y-4">
    <Text htmlTag="h2" size="md" className="text-white/60">
      Discover
    </Text>
    <div className="space-y-4">
      {discoverTabs.map((nav) => (
        <div key={nav.label}>
          <Bartab
            isActive={`/${props.section}` === nav.baseHref}
            left={nav.left}
            text={nav.label}
            onClick={() =>
              props.push(
                `${nav.baseHref}/${getRouteId(
                  nav.baseHref,
                  props.listing,
                )}/details`,
              )
            }
          />
        </div>
      ))}
    </div>
  </div>
);

const BookmarkedTab = () => (
  <div className="space-y-4">
    <Text htmlTag="h2" size="sm" className="text-white/60">
      Bookmarked
    </Text>
    {bookmarkedTabs.map((nav) => (
      <div key={nav.label}>
        <Bartab
          left={nav.left}
          text={nav.label}
          onClick={() => alert('TODO')}
        />
      </div>
    ))}
  </div>
);

const UserTab = () => (
  <div className="space-y-4">
    <Text htmlTag="h2" size="sm" className="text-white/60">
      Your Profile
    </Text>
    <Bartab left={null} text="My Repositories" onClick={() => alert('TODO')} />
    <hr className="h-px border-0 bg-white/20" />
    <Bartab
      left={<Avatar src="/user/@OxDevoor.svg" alt="LoggedIn User" size="sm" />}
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
  <nav className="sticky top-0 flex min-h-screen flex-col justify-between bg-black/5 px-6 pb-6">
    <div className="space-y-4 ">
      <Brand />
      <DiscoverTabs section={section} push={push} listing={listing} />
    </div>
    <div className="flex-1 pt-8">
      <BookmarkedTab />
    </div>
    <div>
      <UserTab />
    </div>
  </nav>
);
