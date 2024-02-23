import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';

import { useAuthorizeOrg } from '@jobstash/admin/state';

interface Props {
  wallet: string;
}

export const ActionButtons = ({ wallet }: Props) => {
  const { isLoading, mutate } = useAuthorizeOrg();

  const approve = () => {
    console.log('approving wallet =', wallet);
    if (wallet) mutate({ wallet, verdict: 'approve' });
  };

  const reject = () => {
    if (wallet) mutate({ wallet, verdict: 'reject' });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Tooltip content="Approve">
        <Button
          isIconOnly
          color="default"
          size="sm"
          isDisabled={isLoading}
          onClick={approve}
        >
          <CheckIcon className="w-6 h-6" />
        </Button>
      </Tooltip>
      <Tooltip content="Reject">
        <Button
          isIconOnly
          color="danger"
          size="sm"
          isDisabled={isLoading}
          onClick={reject}
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </Tooltip>
    </div>
  );
};
