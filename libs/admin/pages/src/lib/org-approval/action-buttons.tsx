import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { useAccount } from 'wagmi';

import { useAuthorizeOrg } from '@jobstash/admin/state';

export const ActionButtons = () => {
  const { address: wallet } = useAccount();

  const { isLoading, mutate } = useAuthorizeOrg();

  const approve = () => {
    if (wallet) mutate({ wallet, verdict: 'approve' });
  };

  const reject = () => {
    if (wallet) mutate({ wallet, verdict: 'approve' });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Tooltip content="Approve">
        <Button
          isIconOnly
          color="default"
          size="sm"
          isLoading={isLoading}
          onClick={approve}
        >
          <CheckIcon className="w-6 h-6" />
        </Button>
      </Tooltip>
      <Tooltip content="Reject">
        <Button isIconOnly color="danger" size="sm" onClick={reject}>
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </Tooltip>
    </div>
  );
};
