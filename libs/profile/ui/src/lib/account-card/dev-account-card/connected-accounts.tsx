import { Button } from '@nextui-org/react';

import { getPluralText } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

import { AccountItem } from './account-item';
import { EditIcon, LeftIcon } from './icons';
import { useConnectedAccounts } from './use-connected-accounts';

export const ConnectedAccounts = () => {
  const { isEditing, toggleEdit, connectedAccounts, hasAccount, canRemove } =
    useConnectedAccounts();

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="lg" fw="bold">
            {`Connected ${getPluralText('Account', connectedAccounts.length)}`}
          </Text>

          {/* We need to have atleast one account along with privy to be able to remove others */}
          {hasAccount && (
            <div>
              <Button
                size="sm"
                variant="flat"
                startContent={isEditing ? <LeftIcon /> : <EditIcon />}
                onClick={toggleEdit}
              >
                {isEditing ? 'Done' : 'Manage Accounts'}
              </Button>
            </div>
          )}
        </div>

        <Text color="dimmed">
          Connect your professional accounts to showcase your complete profile
          and increase your visibility to recruiters.
        </Text>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-0 p-2 pb-4">
        {connectedAccounts.map(({ text, label, avatar, unlink }, index) => (
          <AccountItem
            // eslint-disable-next-line react/no-array-index-key
            key={`${label}-${index}`}
            canRemove={canRemove}
            text={text}
            label={label}
            avatar={avatar}
            unlink={unlink}
          />
        ))}
      </div>
    </>
  );
};
