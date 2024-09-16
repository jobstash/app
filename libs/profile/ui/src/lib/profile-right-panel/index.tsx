import { type ReactNode } from 'react';

import { useAtomValue } from 'jotai';

import { ProfileRightPanelTab } from '@jobstash/profile/core';

import {
  isDisabledPageScrollAtom,
  usePageScrollDisableSyncer,
} from '@jobstash/shared/state';

import { RightPanelWrapper } from '@jobstash/right-panel/ui';
import { Button, DraggableWrapper, Loader } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  header: ReactNode;
  activeTab: string;
  tabs: ProfileRightPanelTab[];
  card: ReactNode;
}

export const ProfileRightPanel = (props: Props) => {
  const { isLoading, header, activeTab, tabs, card } = props;

  const shouldDisable = useAtomValue(isDisabledPageScrollAtom);
  usePageScrollDisableSyncer({ shouldDisable });

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

      <DraggableWrapper className="flex items-center gap-4 p-1">
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
      </DraggableWrapper>

      {card}
    </RightPanelWrapper>
  );
};
