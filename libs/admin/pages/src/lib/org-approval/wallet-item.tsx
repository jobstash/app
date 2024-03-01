import { Avatar } from '@nextui-org/avatar';
import { Tooltip } from '@nextui-org/react';

import { notifSuccess } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  avatar: string | null;
  wallet: string;
}

export const WalletItem = ({ avatar, wallet }: Props) => {
  const onClick = () => {
    if (navigator) {
      navigator.clipboard.writeText(wallet);
      notifSuccess({
        title: `Wallet copied to clipboard!`,
        message: `"${wallet}"`,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar showFallback src={avatar ?? ''} />
      <Tooltip content="Copy Wallet">
        <div className="cursor-pointer" onClick={onClick}>
          <Text>{`${wallet.slice(0, 6)} ... ${wallet.slice(-4)}`}</Text>
        </div>
      </Tooltip>
    </div>
  );
};
