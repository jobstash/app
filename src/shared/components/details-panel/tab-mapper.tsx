'use client';

import { usePathname } from 'next/navigation';

import { HREFS, ROUTE_TABS } from '~/shared/core/constants';

import { DetailsPanelTab } from './tab';

interface Props {
  tabs: { text: string; href: string }[];
}

export const DetailsPanelTabMapper = ({ tabs }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {tabs.map(({ text, href }) => (
        <DetailsPanelTab
          key={text}
          text={text}
          href={href}
          isActive={checkIsActive(pathname, href)}
        />
      ))}
    </>
  );
};

const DEFAULT_TAB = ROUTE_TABS.SHARED.DETAILS;
const LIST_PAGES_PATHS = Object.values(HREFS);

const checkIsActive = (pathname: string, href: string) => {
  const isMatch = pathname === href;

  // Pages w/ list e.g. /jobs does not have [tab] param.
  // We default to 'details' tab
  const isListHrefPath = LIST_PAGES_PATHS.includes(
    pathname as (typeof LIST_PAGES_PATHS)[number],
  );
  const isDefaultTab =
    href.substring(href.length - DEFAULT_TAB.length) === DEFAULT_TAB;

  return isMatch || (isListHrefPath && isDefaultTab);
};
