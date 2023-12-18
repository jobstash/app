import { memo, type ReactNode } from 'react';

import { RightPanelWrapper } from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  isLoading: boolean;
  header: ReactNode;
  tabs: ReactNode;
  card: ReactNode;
}

const ProfileRightPanel = (props: Props) => {
  const { isLoading, header, tabs, card } = props;

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
      {tabs}
      {card}
    </RightPanelWrapper>
  );
};

export default memo(ProfileRightPanel);
