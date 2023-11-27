import { useEffect, useRef, useState } from 'react';

import { Textarea } from '@mantine/core';
import { Getter } from '@tanstack/react-table';

import { roboto } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Button, EditIcon, Text } from '@jobstash/shared/ui';

interface Props {
  getValue: Getter<string>;
  rowIndex: number;
  columnId: string;
  minRows?: number;
}

const EditableTextarea = ({
  getValue,
  rowIndex,
  columnId,
  minRows = 3,
}: Props) => {
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

  const onBlur = () => {
    setIsEditing(false);
    // TODO: update table data
  };

  return (
    <div className="cursor-pointer" onClick={onClickEdit}>
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

export default EditableTextarea;
