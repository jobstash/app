import { memo, type ReactNode } from 'react';

import {
  RightPanelMobileNav,
  RightPanelWrapper,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  backUrl: string;
  isLoading: boolean;
  header: ReactNode;
  tabs: ReactNode;
  card: ReactNode;
}

const ProfileRightPanel = (props: Props) => {
  const { backUrl, isLoading, header, tabs, card } = props;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <RightPanelWrapper>
      <RightPanelMobileNav backURL={backUrl} />
      {header}
      <hr className="border-t border-white/10 -mt-1" />
      {tabs}
      {card}
    </RightPanelWrapper>
  );
};

export default memo(ProfileRightPanel);
