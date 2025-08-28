import { cn } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';

import { ShieldCheckIcon, Text } from '@jobstash/shared/ui';

import { AddAccountButton } from './add-account-button';
import { useAvailableAccounts } from './use-available-accounts';

const ExpertStatusBadge = ({ isExpert }: { isExpert: boolean }) => (
  <div
    className={cn(
      'inline-flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-medium',
      {
        'bg-gradient-to-l from-primary to-tertiary text-white': isExpert,
        'bg-white/5 text-white/80': !isExpert,
      },
    )}
  >
    {isExpert ? (
      <ShieldCheckIcon className="h-4 w-4 stroke-2" />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    )}
    <Text className="font-bold">{isExpert ? 'Expert' : 'Not Expert'}</Text>
  </div>
);

export const AvailableAccounts = () => {
  const availableAccounts = useAvailableAccounts();
  const { isCryptoNative } = useAuthContext();

  if (availableAccounts.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Text size="lg" fw="bold">
            Expert Status
          </Text>
          <ExpertStatusBadge isExpert={isCryptoNative} />
        </div>

        <div className="border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              role="img"
              aria-label={isCryptoNative ? 'celebration' : 'rocket'}
              className="text-xl"
            >
              {isCryptoNative ? '🎉' : '🚀'}
            </span>
            <Text size="lg" fw="semibold">
              {isCryptoNative
                ? "Congratulations! You're qualified as an Expert"
                : 'Become an Expert to unlock premium opportunities'}
            </Text>
          </div>
          <Text color="dimmed" className="leading-relaxed">
            {isCryptoNative
              ? 'You have priority access to expert-only job opportunities and receive personalized assistance from our team when applying to positions.'
              : 'Connect more accounts to prove your crypto-native expertise. Experts have more visibility and access to exclusive job opportunities.'}
          </Text>
        </div>

        <Text color="dimmed">
          {isCryptoNative
            ? 'Add more accounts to enhance your job opportunities and make it easier for organizations to find and reach out to you.'
            : 'Connect your GitHub, wallet, and work email to demonstrate your expertise and unlock expert-only benefits.'}
        </Text>

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
      </div>
    </>
  );
};
