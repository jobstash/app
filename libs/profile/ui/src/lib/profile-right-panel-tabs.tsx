import { memo } from 'react';

import { type ProfileRightPanelTab } from '@jobstash/profile/core';

import { Button } from '@jobstash/shared/ui';

interface Props {
  activeTab: string;
  tabs: ProfileRightPanelTab[];
}

const ProfileRightPanelTabs = ({ activeTab, tabs }: Props) => (
  <div className="flex gap-4 items-center">
    {tabs.map(({ text, onClick }) => (
      <Button
        key={text}
        isActive={text === activeTab}
        variant="outline"
        size="md"
        onClick={onClick}
      >
        {text}
      </Button>
    ))}
  </div>
);

export default memo(ProfileRightPanelTabs);
