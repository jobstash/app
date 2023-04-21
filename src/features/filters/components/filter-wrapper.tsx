import { type ReactNode, memo } from 'react';

import { Heading } from '~/shared/components';

interface Props {
  children: ReactNode;
  label?: string;
}

const FilterWrapper = ({ label, children }: Props) => (
  <div className="flex flex-col gap-2.5">
    {label && (
      <Heading size="label" fw="semibold">
        {label}
      </Heading>
    )}
    {children}
  </div>
);

export default memo(FilterWrapper);
