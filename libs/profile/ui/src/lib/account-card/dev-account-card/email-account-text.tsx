import { useMemo } from 'react';

import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

import { getEmailAvatar } from '@jobstash/profile/utils';

import {
  useRemoveAttachedEmail,
  useUpdateMainEmail,
} from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

import { AccountText } from './account-text';

interface Props {
  email: string;
  isMain?: boolean;
  hasGithub?: boolean;
}

export const EmailAccountText = ({ email, isMain, hasGithub }: Props) => {
  const { isPending: isPendingDetach, mutate: detachEmail } =
    useRemoveAttachedEmail();
  const { isPending: isPendingUpdateMainEmail, mutate: updateMainEmail } =
    useUpdateMainEmail(email);

  const menuItems = useMemo(() => {
    const items: { label: string; onClick: () => void }[] = [];

    if (!isMain) {
      items.push({
        label: 'Set as Main Account',
        onClick: updateMainEmail,
      });
    }

    items.push({
      label: 'Detach Email',
      onClick: () => detachEmail(email),
    });

    return items;
  }, [detachEmail, email, isMain, updateMainEmail]);

  // TODO: If there's one email left, allow detach email only if has github

  const isLoading = isPendingDetach || isPendingUpdateMainEmail;

  return (
    <div className="flex items-center w-full justify-between h-10">
      <AccountText
        text={email}
        avatar={getEmailAvatar(email)}
        subText={
          isMain ? (
            <Text className="text-sm text-white/70">Main Account</Text>
          ) : null
        }
      />
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly size="sm" isLoading={isLoading} variant="light">
            <EllipsisVerticalIcon className="w-6 h-6 stroke-1 fill-white/50" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Email Actions">
          {menuItems.map(({ label, onClick }) => (
            <DropdownItem key={label} onClick={onClick}>
              {label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
