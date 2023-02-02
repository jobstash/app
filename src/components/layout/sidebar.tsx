/* eslint-disable no-alert */
import { ActiveSectionCards } from '~/contexts/root-context';
import { RouterPush } from '~/core/types';

import { Avatar } from '../base/avatar';
import { Bartab } from '../base/bartab';
import { Brand } from '../base/brand';
import { Text } from '../base/text';

import { bookmarkedTabs, discoverTabs } from './constants';

export const DiscoverTabs = (props: {
  section: string;
  activeCards: ActiveSectionCards;
  push: RouterPush;
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
              nav.label === 'Jobs' // Jobs route for now
                ? props.push(
                    `${nav.baseHref}/${
                      props.activeCards[
                        nav.label.toLowerCase() as keyof typeof props.activeCards
                      ]
                    }`,
                    {
                      shouldScroll: true,
                      shallow: true,
                    },
                  )
                : alert('TODO')
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
  activeCards: ActiveSectionCards;
}

export const SideBar = ({ section, push, activeCards }: Props) => (
  <nav className="fixed inset-y-0 flex min-h-screen flex-col p-4">
    <div className="">
      <Brand />
      <DiscoverTabs section={section} push={push} activeCards={activeCards} />
    </div>
    <div className="">
      <BookmarkedTab />
    </div>
    <div>
      <UserTab />
    </div>
  </nav>
);
