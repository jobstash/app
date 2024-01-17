import { type ReactNode } from 'react';

import { ProfileRightPanelTab } from '@jobstash/profile/core';

import { RightPanelWrapper } from '@jobstash/right-panel/ui';
import { Button, Loader } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  header: ReactNode;
  activeTab: string;
  tabs: ProfileRightPanelTab[];
  card: ReactNode;
}

export const ProfileRightPanel = (props: Props) => {
  const { isLoading, header, activeTab, tabs, card } = props;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <RightPanelWrapper>
      {header}

      <hr className="border-t border-2 border-white/10 -mt-1" />

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

      {card}
    </RightPanelWrapper>
  );
};
