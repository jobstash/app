import { memo, type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  children: ReactNode;
}

const RightPanelCardBorder = ({ children }: Props) => (
  <div
    className={cn(
      'rounded-3xl bg-gradient-to-l from-primary to-tertiary p-0.5',
    )}
  >
    <div className="rounded-3xl bg-darker-gray">{children}</div>
  </div>
);

export default memo(RightPanelCardBorder);
