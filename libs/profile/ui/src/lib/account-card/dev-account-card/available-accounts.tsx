import { Text } from '@jobstash/shared/ui';

import { AddAccountButton } from './add-account-button';
import { useAvailableAccounts } from './use-available-accounts';

export const AvailableAccounts = () => {
  const availableAccounts = useAvailableAccounts();

  if (availableAccounts.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-2">
        <Text size="lg" fw="bold">
          Link Additional Accounts
        </Text>

        <Text color="dimmed">
          Add more accounts to enhance your job opportunities and make it easier
          for organizations to find and reach out to you.
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
  );
};
