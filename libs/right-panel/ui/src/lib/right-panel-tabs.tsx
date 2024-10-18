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
  <div className="flex flex-wrap gap-2">
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
