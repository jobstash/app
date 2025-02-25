import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { useSetAtom } from 'jotai';

import { OrgProfileInfo } from '@jobstash/profile/core';

import { orgApprovalProfileAtom, useAuthorizeOrg } from '@jobstash/admin/state';

interface Props {
  org: OrgProfileInfo;
}

export const ActionButtons = ({ org }: Props) => {
  const { isPending, mutate } = useAuthorizeOrg();
  const setOrgApprovalProfile = useSetAtom(orgApprovalProfileAtom);

  const { wallet } = org;

  const approve = () => {
    setOrgApprovalProfile({ org, isOpen: true });
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
