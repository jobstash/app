import type { ReactNode } from 'react';

import { Heading } from '~/shared/components';

interface Props {
  children: ReactNode;
  label?: string;
}

export const FilterWrapper = ({ label, children }: Props) => (
  <div className="flex flex-col gap-2.5">
    {label && (
      <Heading size="sm" fw="semibold">
        {label}
      </Heading>
    )}
    {children}
  </div>
);