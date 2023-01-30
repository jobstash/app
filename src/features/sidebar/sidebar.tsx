/* eslint-disable no-alert */
import { ActiveSectionCards } from '~/contexts/root-context';
import { RouterPush } from '~/core/types';

import { Bartab } from '../unstyled-ui/bartab';
import { Avatar } from '../unstyled-ui/base/avatar';
import { Brand } from '../unstyled-ui/base/brand';
import { Text } from '../unstyled-ui/base/text';

import { bookmarkedTabs, discoverTabs } from './constants';

/** UNSTYLED */
export const DiscoverTabs = (props: {
  section: string;
  activeCards: ActiveSectionCards;
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

/** UNSTYLED */
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

/** UNSTYLED */
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
  activeCards: ActiveSectionCards;
}

/** UNSTYLED */
export const SideBar = ({ section, push, activeCards }: Props) => (
  <nav className="sticky top-0 flex min-h-screen flex-col justify-between bg-black/5 px-6 pb-6">
    <div className="space-y-4 ">
      <Brand />
      <DiscoverTabs section={section} push={push} activeCards={activeCards} />
    </div>
    <div className="flex-1 pt-8">
      <BookmarkedTab />
    </div>
    <div>
      <UserTab />
    </div>
  </nav>
);
