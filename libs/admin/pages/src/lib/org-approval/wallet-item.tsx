import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { CopyIcon } from 'lucide-react';

import { notifSuccess } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  wallet: string;
}

export const WalletItem = ({ wallet }: Props) => {
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
      <Text>{`${wallet.slice(0, 6)} ... ${wallet.slice(-4)}`}</Text>
      <Tooltip content="Copy Wallet">
        <Button isIconOnly size="sm" variant="light" onClick={onClick}>
          <CopyIcon size={12} />
        </Button>
      </Tooltip>
    </div>
  );
};
