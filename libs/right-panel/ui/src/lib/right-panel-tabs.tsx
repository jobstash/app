import { memo } from 'react';

import { type RightPanelTab } from '@jobstash/right-panel/core';

import RightPanelTabButton from './right-panel-tab-button';

interface Props {
  isLoading: boolean;
  currentTab: string;
  tabs: RightPanelTab[];
}

const RightPanelTabs = ({ isLoading, currentTab, tabs }: Props) => (
  <div className="flex items-center flex-wrap gap-4 border-t border-white/10 pt-8">
    {tabs.map(({ text, tabSegment, href }) => (
      <RightPanelTabButton
        key={text}
        text={text}
        currentTab={currentTab}
        tabSegment={tabSegment}
        href={href}
      />
    ))}
    {isLoading && (
      <div className="pl-1 flex items-center">
        <div
          className="animate-spin2 opacity-40 inline-block w-5 h-5 border-2 border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )}
  </div>
);

export default memo(RightPanelTabs);
