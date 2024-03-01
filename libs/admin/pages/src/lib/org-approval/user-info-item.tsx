import { Tooltip } from '@nextui-org/react';

import { cn, notifSuccess } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  icon: React.ReactNode;
  text: string | null;
  tooltip: string;
}

export const UserInfoItem = ({ icon, text, tooltip }: Props) => {
  const onClick = () => {
    if (navigator && text) {
      navigator.clipboard.writeText(text);
      notifSuccess({
        title: `${tooltip} copied to clipboard!`,
        message: `"${text}"`,
      });
    }
  };

  return (
    <div className="relative">
      <Tooltip
        content={`${text ? 'Copy' : 'No'} ${tooltip}`}
        delay={0}
        placement="left"
      >
        <button
          type="button"
          className={cn('flex items-center gap-2 w-full', {
            'cursor-default': !text,
          })}
          onClick={onClick}
        >
          <div className="flex items-center gap-2">
            <div className="w-4">{icon}</div>
            <Text size="sm">:</Text>
          </div>
          <div className="growtext-start">
            <Text size="sm">{text ?? 'N/A'}</Text>
          </div>
        </button>
      </Tooltip>
    </div>
  );
};
