/* eslint-disable no-alert */
import { ActiveSectionCards } from '~/contexts/root-context';
import { RouterPush } from '~/core/types';

import { BarTab } from '../unstyled-ui/bartab';

import { bookmarkedTabs, discoverTabs } from './constants';

/** UNSTYLED */
const Brand = () => (
  <div className="py-4">
    <h2>recruiters.rip</h2>
  </div>
);

/** UNSTYLED */
export const DiscoverTabs = (props: {
  section: string;
  activeCards: ActiveSectionCards;
  push: RouterPush;
}) => (
  <div className="space-y-4">
    <h2 className="text-zinc-400">Discover</h2>
    <div className="space-y-4">
      {discoverTabs.map((nav) => (
        <div key={nav.label}>
          <BarTab
            isActive={`/${props.section}` === nav.baseHref}
            leftSection={nav.left}
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
          >
            {nav.label}
          </BarTab>
        </div>
      ))}
    </div>
  </div>
);

/** UNSTYLED */
const BookmarkedTab = () => (
  <div className="space-y-4">
    <h2 className="text-zinc-400">Bookmarked</h2>
    {bookmarkedTabs.map((nav) => (
      <div key={nav.label}>
        <BarTab leftSection={nav.left} onClick={() => alert('TODO')}>
          {nav.label}
        </BarTab>
      </div>
    ))}
  </div>
);

/** UNSTYLED */
const UserTab = () => (
  <div className="space-y-8">
    <hr className="h-px border-0 bg-neutral-500" />
    <BarTab leftSection={null} onClick={() => alert('TODO')}>
      Laura Tyson
    </BarTab>
  </div>
);

interface Props {
  section: string;
  push: RouterPush;
  activeCards: ActiveSectionCards;
}

/** UNSTYLED */
export const SideBar = ({ section, push, activeCards }: Props) => (
  <nav className="sticky top-0 flex min-h-screen flex-col justify-between bg-black/5 px-6">
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
