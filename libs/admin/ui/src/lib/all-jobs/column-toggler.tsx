import { ChangeEventHandler, useTransition } from 'react';

import { Checkbox } from '@mantine/core';

interface Props {
  label: string;
  isChecked: boolean;
  handler: (e: unknown) => void;
}

const ColumnToggler = ({ label, isChecked, handler }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      handler(e);
    });
  };

  return (
    <Checkbox
      label={label}
      checked={isChecked}
      classNames={{ input: 'bg-dark checked:bg-dark-gray checked:border-gray' }}
      disabled={isPending}
      onChange={onChange}
    />
  );
};

export default ColumnToggler;
