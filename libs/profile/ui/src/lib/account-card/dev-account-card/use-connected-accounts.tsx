import { useMemo, useReducer } from 'react';

import { usePrivy, User } from '@privy-io/react-auth';

import { useLinkedWallets } from '@jobstash/auth/state';
import { useDevProfileInfoContext } from '@jobstash/profile/state';

interface ConnectedAccount {
  text: string;
  label: string;
  unlink: () => Promise<User>;
  avatar?: string | null;
}

export const useConnectedAccounts = () => {
  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  const { profileInfoData } = useDevProfileInfoContext();

  const {
    user,
    unlinkEmail,
    unlinkGithub,
    unlinkGoogle,
    unlinkFarcaster,
    unlinkTelegram,
    unlinkWallet,
  } = usePrivy();

  const wallets = useLinkedWallets();

  const connectedAccounts = useMemo(() => {
    if (!user) return [];

    const { email, farcaster, github, google, telegram } = user;

    const connectedAccounts = [
      github && {
        text: github.username,
        label: 'Github',
        avatar: profileInfoData?.githubAvatar,
        unlink: () => unlinkGithub(github.subject),
      },
      email && {
        text: email.address,
        label: 'Email',
        unlink: () => unlinkEmail(email.address),
      },
      telegram && {
        text: telegram.username,
        label: 'Telegram',
        unlink: () => unlinkTelegram(telegram.telegramUserId),
      },
      google && {
        text: google.email,
        label: 'Google',
        unlink: () => unlinkGoogle(google.subject),
      },
      farcaster &&
        farcaster.fid !== null && {
          text: farcaster.username,
          label: 'Farcaster',
          avatar: farcaster.pfp,
          unlink: () => unlinkFarcaster(farcaster.fid as number),
        },
      ...wallets.map((wallet) => ({
        text: wallet,
        label: 'Wallet',
        unlink: () => unlinkWallet(wallet),
      })),
    ].filter(Boolean);

    return connectedAccounts as ConnectedAccount[];
  }, [
    profileInfoData?.githubAvatar,
    unlinkEmail,
    unlinkFarcaster,
    unlinkGithub,
    unlinkGoogle,
    unlinkTelegram,
    unlinkWallet,
    user,
    wallets,
  ]);

  return {
    isEditing,
    toggleEdit,
    connectedAccounts,
    hasAccount: connectedAccounts.length > 1,
    canRemove: isEditing && connectedAccounts.length > 1,
  };
};
