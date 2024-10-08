import { useEffect, useState, useTransition } from 'react';

import { Select } from '@mantine/core';
import { type CellContext } from '@tanstack/react-table';

import { type JobsUpdateableFields } from '@jobstash/admin/core';
import { roboto } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Spinner, Text } from '@jobstash/shared/ui';

type Props = CellContext<JobsUpdateableFields, boolean | string | null> & {
  options: string[] | { label: string; value: string }[];
};

const SelectCell = (props: Props) => {
  const { getValue, row, column, options, table } = props;

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
      });
    }

    setIsEditing(false);
  };

  if (isPending) return <Spinner />;

  return (
    <div className="cursor-pointer" onClick={onClickEdit}>
      {isEditing ? (
        <div className="py-2">
          <Select
            autoFocus
            searchable
            clearable
            data={options}
            allowDeselect={false}
            className="w-full"
            classNames={{
              input: cn(
                `${roboto.variable} font-roboto antialiased rounded-lg bg-dark text-white/80 border-0`,
              ),
              itemsWrapper: 'bg-dark',
            }}
            value={
              typeof value === 'boolean' ? value.toString() : value ?? null
            }
            onChange={(v) => setValue(v)}
            onBlur={onBlur}
          />
        </div>
      ) : (
        <div className="p-3">
          <Text>{value === null ? '- - -' : value.toString()}</Text>
        </div>
      )}
    </div>
  );
};

export default SelectCell;
