import { Checkbox, CheckboxProps, Tooltip } from '@nextui-org/react';
import { EarthIcon, LockIcon } from 'lucide-react';

import { cn, getPluralText } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

export interface Props extends CheckboxProps {
  label: string;
  itemCount: number;
  isPublic: boolean;
}

export const BookmarkListCheckBox = ({
  label,
  itemCount,
  isPublic,
  ...props
}: Props) => {
  const countText =
    itemCount === 0
      ? 'No jobs on this list'
      : `${itemCount} ${getPluralText('job post', itemCount)}`;

  return (
    <Tooltip isDisabled={label.length < 20} content={label}>
      <Checkbox
        aria-label={label}
        color="default"
        classNames={{
          base: cn(
            'inline-flex max-w-md w-full bg-content1 m-0',
            'hover:bg-content2 items-center justify-start',
            'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
            // 'data-[selected=true]:border-indigo-800',
          ),
          label: 'w-full',
        }}
        {...props}
      >
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex flex-col gap-0">
            <Heading size="sm" className="max-w-[20ch] truncate">
              {label}
            </Heading>
            <Text size="sm">{countText}</Text>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-tiny text-default-500">
              <Tooltip content={isPublic ? 'Public' : 'Private'}>
                {isPublic ? (
                  <EarthIcon className="w-4 h-4 fill-gray-700" />
                ) : (
                  <LockIcon className="w-4 h-4 fill-gray-700" />
                )}
              </Tooltip>
            </span>
          </div>
        </div>
      </Checkbox>
    </Tooltip>
  );
};
