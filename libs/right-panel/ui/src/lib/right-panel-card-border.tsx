import { memo, type ReactNode } from 'react';

import { TOUR_SELECTOR_ID } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
}

const RightPanelCardBorder = ({ children }: Props) => (
  <div
    id={TOUR_SELECTOR_ID}
    className={cn(
      'rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5',
    )}
  >
    <div className="rounded-3xl bg-darker-gray relative">{children}</div>
  </div>
);

export default memo(RightPanelCardBorder);
