import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Button, Tooltip } from '@nextui-org/react';

import { useAuthorizeOrgAffiliation } from '@jobstash/admin/state';

interface Props {
  wallet: string;
  orgId: string;
}

export const ActionsCell = ({ wallet, orgId }: Props) => {
  const { mutate, isPending } = useAuthorizeOrgAffiliation();

  const approve = () => {
    mutate({ wallet, orgId, verdict: 'approve' });
  };

  const reject = () => {
    mutate({ wallet, orgId, verdict: 'reject' });
  };

  return (
    <div className="flex items-center gap-4">
      <Tooltip content="Approve">
        <Button
          isIconOnly
          color="default"
          size="sm"
          isDisabled={isPending}
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
          isDisabled={isPending}
          onClick={reject}
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </Tooltip>
    </div>
  );
};
