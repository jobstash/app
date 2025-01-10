import { type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  label: string;
  input: ReactNode;
  isDisabled?: boolean;
}

const AdminFormControl = ({ label, input, isDisabled }: Props) => (
  <div className="gap-6">
    <div className={cn('pb-2', { 'opacity-40': isDisabled })}>
      <Heading size="sm" fw="semibold">
        {label}
      </Heading>
    </div>
    <div className="w-full gap-8">{input}</div>
  </div>
);

export default AdminFormControl;
