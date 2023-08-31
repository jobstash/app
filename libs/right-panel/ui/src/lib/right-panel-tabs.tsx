import { memo } from 'react';

import { type RightPanelTab } from '@jobstash/right-panel/core';

import { Spinner } from '@jobstash/shared/ui';

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
    {isLoading && <Spinner />}
  </div>
);

export default memo(RightPanelTabs);
