import { memo } from 'react';

import { type RightPanelTab } from '@jobstash/right-panel/core';

import { DraggableWrapper, Spinner } from '@jobstash/shared/ui';

import RightPanelTabButton from './right-panel-tab-button';

interface Props {
  isLoading: boolean;
  currentTab: string;
  tabs: RightPanelTab[];
}

const RightPanelTabs = ({ isLoading, currentTab, tabs }: Props) => (
  <>
    <hr className="border-t border-white/10 -my-2" />
    <DraggableWrapper className="flex items-center gap-4 py-1">
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
    </DraggableWrapper>
  </>
);

export default memo(RightPanelTabs);
