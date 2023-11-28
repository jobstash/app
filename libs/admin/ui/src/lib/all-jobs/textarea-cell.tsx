import { useEffect, useState, useTransition } from 'react';

import { Textarea } from '@mantine/core';
import { type CellContext } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';
import { roboto } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

type Props = CellContext<JobsUpdateableFields, string>;

const TextareaCell = (props: Props) => {
  const { getValue, row, column, table } = props;

  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  // Sync initial value
  useEffect(() => {
    setValue(initialValue);
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

  return (
    <div
      className={cn('cursor-pointer', {
        'pointer-events-none select-none opacity-50': isPending,
      })}
      onClick={onClickEdit}
    >
      {isEditing ? (
        <div className="py-0.5">
          <Textarea
            autoFocus
            autosize
            className="w-full"
            classNames={{
              input: cn(
                `${roboto.variable} font-roboto antialiased rounded-lg bg-transparent focus:bg-dark text-white/80 border-0 focus:border-white/40 overflow-hidden focus:overflow-auto`,
              ),
            }}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onBlur={onBlur}
          />
        </div>
      ) : (
        <div className="p-3">
          <Text>{value}</Text>
        </div>
      )}
    </div>
  );
};

export default TextareaCell;
