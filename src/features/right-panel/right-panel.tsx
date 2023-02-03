import { useEffect } from 'react';

import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  LABEL_COMPETITORS,
  LABEL_JOBS,
  LABEL_PROJECTS,
  LABEL_REPOSITORIES,
  rightPanelTabs,
} from '~/core/constants';
import type { RouteSegments } from '~/core/interfaces';
import type { RouterPush } from '~/core/types';
import { useRootContext } from '~/hooks/use-root-context';

import { RightPanelCard } from './right-panel-card';
import { RightPanelHeader } from './right-panel-header';
import { RightPanelTab } from './right-panel-tab';
import type { RightPanelTabLabel } from './types';

interface Props {
  segments: RouteSegments;
  push: RouterPush;
}

const isEmptyTab = <T,>(
  tab: RightPanelTabLabel,
  label: RightPanelTabLabel,
  arr: T[],
) => {
  if (tab === label && arr.length === 0) return true;
};

/** UNSTYLED */
export const RightPanel = ({ segments, push }: Props) => {
  const { activeListing } = useRootContext();

  // Check if not empty (might be empty due to SSR)
  const hasActiveListing = activeListing.org.name.length > 0;

  // Whenever a card is clicked, scroll right-panel to top
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector('#' + ID_TOP_RIGHT_PANEL);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener(EVENT_CARD_CLICK, scrollListener);

    return () => document.removeEventListener(EVENT_CARD_CLICK, scrollListener);
  }, []);

  const checkShouldRenderTab = (tab: RightPanelTabLabel) => {
    const { jobs, projects, competitors, repositories } = activeListing;

    // If section-segment matches tab, omit (should be inside details tab)
    if ((tab as string).toLowerCase() === segments.section) return false;

    // Organization section
    if (tab === 'Organization' && segments.section === 'organizations')
      return false;

    // Check array lengths
    if (isEmptyTab(tab, LABEL_JOBS, jobs)) return false;
    if (isEmptyTab(tab, LABEL_PROJECTS, projects)) return false;
    if (isEmptyTab(tab, LABEL_COMPETITORS, competitors)) return false;
    if (isEmptyTab(tab, LABEL_REPOSITORIES, repositories)) return false;

    return true;
  };

  return (
    <div className="hide-scrollbar sticky top-0 max-h-screen space-y-6 overflow-y-scroll px-6">
      <div className="top-0" id={ID_TOP_RIGHT_PANEL} />
      <RightPanelHeader org={activeListing.org} />

      <div className="">
        <hr className="h-px border-0 bg-white/20" />
      </div>

      <div className="flex space-x-4">
        {rightPanelTabs.map(
          (tab) =>
            checkShouldRenderTab(tab) && (
              <RightPanelTab
                key={tab}
                label={tab}
                segments={segments}
                push={push}
                activeListing={activeListing}
              />
            ),
        )}
      </div>

      {hasActiveListing && (
        <RightPanelCard
          activeListing={activeListing}
          section={segments.section}
          tabSegment={segments.tab}
        />
      )}
    </div>
  );
};
