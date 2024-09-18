import React, { useReducer, useState } from 'react';

import { Avatar, Button, Tooltip } from '@nextui-org/react';
import { useLinkAccount, usePrivy, User, Wallet } from '@privy-io/react-auth';
import { Github as GithubIcon } from 'lucide-react';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import {
  conditionalItems,
  getPluralText,
  notifError,
  notifSuccess,
} from '@jobstash/shared/utils';

import { useDevProfileInfoContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

export const LinkedAccounts = () => {
  const { profileInfoData } = useDevProfileInfoContext();
  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  const {
    user,
    unlinkEmail,
    unlinkGithub,
    unlinkGoogle,
    unlinkFarcaster,
    unlinkWallet,
  } = usePrivy();

  const {
    linkEmail,
    linkFarcaster,
    linkGithub,
    linkGoogle,
    linkTelegram,
    linkWallet,
  } = useLinkAccount({
    onSuccess() {
      if (isEditing) {
        toggleEdit();
      }

      notifSuccess({
        title: 'Account Connected!',
        message:
          "You've successfully linked your account, enhancing your profile visibility.",
      });
    },
    onError(error) {
      if (error !== 'exited_link_flow') {
        notifError({
          title: 'Failed to link account!',
          message:
            error === 'cannot_link_more_of_type'
              ? 'Account already added'
              : ERR_INTERNAL,
        });
      }
    },
  });

  if (!user) return null;

  const { email, farcaster, github, google, telegram, linkedAccounts } = user;
  const wallets = linkedAccounts
    .filter(
      (account) =>
        account.type === 'wallet' && account.walletClientType !== 'privy',
    )
    .map((wallet) => (wallet as Wallet).address);

  const items = conditionalItems([
    [
      !email,
      {
        onClick: linkEmail,
        label: 'Email',
        icon: <EmailIcon />,
      },
    ],
    [
      !github,
      {
        onClick: linkGithub,
        label: 'Github',
        icon: <GithubIcon size={16} />,
      },
    ],
    [
      !google,
      {
        onClick: linkGoogle,
        label: 'Google',
        icon: <GoogleIcon />,
      },
    ],
    [
      !telegram,
      {
        onClick: linkTelegram,
        label: 'Telegram',
        icon: <TelegramIcon />,
      },
    ],
    [
      !farcaster,
      {
        onClick: linkFarcaster,
        label: 'Farcaster',
        icon: <FarcasterIcon />,
      },
    ],
    [
      true,
      {
        onClick: linkWallet,
        label: 'Wallet',
        icon: <WalletIcon />,
      },
    ],
    // TODO: Add these login options
    // [
    //   !apple,
    //   {
    //     key: 'apple',
    //     onClick: linkApple,
    //     text: 'Apple',
    //   },
    // ],
  ]);

  const canRemove = isEditing && linkedAccounts.length > 2;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Text size="lg" fw="bold">
            {`Connected ${getPluralText('Account', linkedAccounts.length - 1)}`}
          </Text>

          {/* We need to have atleast one account along with privy to be able to remove others */}
          {linkedAccounts.length > 2 && (
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
        {github && (
          <AccountItem
            canRemove={canRemove}
            text={github.username}
            avatar={profileInfoData?.avatar}
            label="Github"
            unlink={async () => unlinkGithub(github.subject)}
          />
        )}

        {email && (
          <AccountItem
            canRemove={canRemove}
            text={email.address}
            label="Email"
            unlink={async () => unlinkEmail(email.address)}
          />
        )}

        {google && (
          <AccountItem
            canRemove={canRemove}
            text={`${google.email}`}
            label="Google"
            unlink={async () => unlinkGoogle(google.subject)}
          />
        )}

        {farcaster && farcaster.fid !== null && (
          <AccountItem
            canRemove={canRemove}
            text={`${farcaster.username}`}
            avatar={farcaster.pfp}
            label="Farcaster"
            unlink={async () => unlinkFarcaster(farcaster.fid as number)}
          />
        )}

        {wallets.map((wallet) => (
          <AccountItem
            key={wallet}
            canRemove={canRemove}
            text={formatAddress(wallet)}
            label="Wallet"
            unlink={async () => unlinkWallet(wallet)}
          />
        ))}
      </div>

      {items.length > 0 && (
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
            {items.map(({ label, icon, onClick }) => (
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

const AccountItem = ({
  canRemove,
  text,
  label,
  avatar,
  unlink,
}: {
  canRemove: boolean;
  text: string | null;
  label: string;
  avatar?: string | null;
  unlink?: () => Promise<User>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!text) return null;

  const unlinkAccount = async () => {
    if (unlink) {
      setIsLoading(true);
      await unlink();
      setIsLoading(false);
    }
  };

  const src =
    avatar ?? `https://api.dicebear.com/9.x/identicon/png?seed=${text}`;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Text fw="bold">{label}:</Text>
        <div className="h-6 flex items-center">
          {canRemove && (
            <Tooltip content={`Unlink ${label}`}>
              <Button
                isIconOnly
                isLoading={isLoading}
                size="sm"
                variant="light"
                onClick={unlinkAccount}
              >
                <RemoveIcon />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 pl-1">
        <Avatar src={src} alt={text} className="w-6 h-6" />
        <div className="flex flex-col">
          <Text fw="bold">{text}</Text>
        </div>
      </div>
    </div>
  );
};

const AddAccountButton = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) => (
  <div className="w-fit relative min-h-16 flex items-end w-fit">
    <Button size="sm" startContent={icon} onClick={onClick}>
      {label}
    </Button>
  </div>
);

const EditIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-4 h-4 text-white/60"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const RemoveIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-4 h-4 text-danger/80"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const formatAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const EmailIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-4 h-4 text-white/80"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 256 262"
    className="w-4 h-4 text-white/80"
  >
    <path
      fill="#7E7E7E"
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
    />
    <path
      fill="#7C7C7C"
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
    />
    <path
      fill="#BABABA"
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
    />
    <path
      fill="#747474"
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
    />
  </svg>
);

const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-4 h-4 fill-white"
  >
    <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" />
  </svg>
);

const FarcasterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3 text-white/80"
  >
    <path
      d="M4.11834 0H19.5976V24H17.3254V13.0065H17.3032C17.052 9.96809 14.71 7.5871 11.858 7.5871C9.00594 7.5871 6.66394 9.96809 6.41282 13.0065H6.39053V24H4.11834V0Z"
      fill="#9CA3AF"
    />
    <path
      d="M0 3.40645L0.923077 6.8129H1.70414V20.5935C1.31199 20.5935 0.994083 20.9402 0.994083 21.3677V22.2968H0.852071C0.459916 22.2968 0.142012 22.6434 0.142012 23.071V24H8.09467V23.071C8.09467 22.6434 7.77677 22.2968 7.38462 22.2968H7.2426V21.3677C7.2426 20.9402 6.9247 20.5935 6.53254 20.5935H5.68047V3.40645H0Z"
      fill="#9CA3AF"
    />
    <path
      d="M17.4675 20.5935C17.0753 20.5935 16.7574 20.9402 16.7574 21.3677V22.2968H16.6154C16.2232 22.2968 15.9053 22.6434 15.9053 23.071V24H23.858V23.071C23.858 22.6434 23.5401 22.2968 23.1479 22.2968H23.0059V21.3677C23.0059 20.9402 22.688 20.5935 22.2959 20.5935V6.8129H23.0769L24 3.40645H18.3195V20.5935H17.4675Z"
      fill="#9CA3AF"
    />
  </svg>
);

const WalletIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-4 h-4 text-white/80"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
    />
  </svg>
);

const LeftIcon = () => (
  <svg
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-4 h-4 text-white/80"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
);
