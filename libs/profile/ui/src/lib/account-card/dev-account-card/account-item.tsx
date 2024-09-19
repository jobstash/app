import { useState } from 'react';

import { Avatar, Button, Tooltip } from '@nextui-org/react';
import { User } from '@privy-io/react-auth';

import { notifError } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

import { RemoveIcon } from './icons';

interface Props {
  canRemove: boolean;
  text: string | null;
  label: string;
  avatar?: string | null;
  unlink?: () => Promise<User>;
}

export const AccountItem = ({
  canRemove,
  text,
  label,
  avatar,
  unlink,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!text) return null;

  const unlinkAccount = async () => {
    if (unlink) {
      setIsLoading(true);

      try {
        await unlink();
      } catch (error) {
        notifError({
          title: 'Failed to link account!',
          message: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const src =
    avatar ?? `https://api.dicebear.com/9.x/identicon/png?seed=${text}`;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Text fw="bold">{label}:</Text>
        <div className="h-6 flex items-center">
          {canRemove && (
            <Tooltip content={`Unlink ${label}`}>
              <Button
                isIconOnly
                isLoading={isLoading}
                size="sm"
                variant="light"
                onClick={unlinkAccount}
              >
                <RemoveIcon />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 pl-1">
        <Avatar src={src} alt={text} className="w-6 h-6" />
        <div className="flex flex-col">
          <Text fw="bold">{text}</Text>
        </div>
      </div>
    </div>
  );
};