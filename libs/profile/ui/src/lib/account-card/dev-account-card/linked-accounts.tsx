import { useCallback, useReducer } from 'react';

import { Button } from '@nextui-org/react';

import { getPluralText, notifSuccess } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

import { AccountItem } from './account-item';
import { AddAccountButton } from './add-account-button';
import { EditIcon, LeftIcon } from './icons';
import { useAvailableAccounts } from './use-available-accounts';
import { useConnectedAccounts } from './use-connected-accounts';

export const LinkedAccounts = () => {
  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  const onSuccessConnectAccount = useCallback(() => {
    if (isEditing) {
      toggleEdit();
    }

    notifSuccess({
      title: 'Account Connected!',
      message:
        "You've successfully linked your account, enhancing your profile visibility.",
    });
  }, [isEditing, toggleEdit]);

  const availableAccounts = useAvailableAccounts(onSuccessConnectAccount);
  const connectedAccounts = useConnectedAccounts();

  const canRemove = isEditing && connectedAccounts.length > 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="lg" fw="bold">
            {`Connected ${getPluralText('Account', connectedAccounts.length)}`}
          </Text>

          {/* We need to have atleast one account along with privy to be able to remove others */}
          {connectedAccounts.length > 1 && (
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

      {availableAccounts.length > 0 && (
        <>
          <hr className="border-t border-white/10" />

          <div className="flex flex-col gap-2">
            <Text size="lg" fw="bold">
              Link Additional Accounts
            </Text>

            <Text color="dimmed">
              Add more accounts to enhance your job opportunities and make it
              easier for organizations to find and reach out to you.
            </Text>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {availableAccounts.map(({ label, icon, onClick }) => (
              <AddAccountButton
                key={label}
                label={label}
                icon={icon}
                onClick={onClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
