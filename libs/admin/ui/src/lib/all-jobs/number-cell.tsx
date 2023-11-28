import { useEffect, useState, useTransition } from 'react';

import { NumberInput } from '@mantine/core';
import { CellContext } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';
import { roboto } from '@jobstash/shared/core';
import { cn, numFormatter } from '@jobstash/shared/utils';

import { Spinner, Text } from '@jobstash/shared/ui';

type Props = CellContext<JobsUpdateableFields, number | null>;

const NumberCell = (props: Props) => {
  const { getValue, row, column, table } = props;

  const initialValue = getValue();
  const [value, setValue] = useState<number | ''>(initialValue ?? '');

  // Sync initial value
  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);

  const [isEditing, setIsEditing] = useState(false);
  const onClickEdit = () => {
    if (!isEditing) setIsEditing(true);
  };

  const isChanged = JSON.stringify(value) !== JSON.stringify(initialValue);

  const [isPending, startTransition] = useTransition();

  const onBlur = () => {
    if (isChanged) {
      startTransition(() => {
        table.options.meta?.updateData(row.index, column.id, value);
        setIsEditing(false);
      });
    }
  };

  if (isPending) return <Spinner />;

  return (
    <div className="cursor-pointer" onClick={onClickEdit}>
      {isEditing ? (
        <NumberInput
          autoFocus
          classNames={{
            input: cn(
              `${roboto.variable} font-roboto antialiased rounded-lg bg-transparent focus:bg-dark text-white/80 border-0 focus:border-white/40`,
            ),
          }}
          value={value}
          onChange={setValue}
          onBlur={onBlur}
        />
      ) : (
        <div className="p-3">
          <Text>{value === '' ? '- - -' : numFormatter.format(value)}</Text>
        </div>
      )}
    </div>
  );
};

export default NumberCell;
