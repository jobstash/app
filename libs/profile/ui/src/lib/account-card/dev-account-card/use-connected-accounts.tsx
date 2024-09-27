import { useCallback, useMemo, useReducer } from 'react';

import { usePrivy, User } from '@privy-io/react-auth';
import { useQueryClient } from '@tanstack/react-query';

import { notifError } from '@jobstash/shared/utils';

import { useLinkedWallets } from '@jobstash/auth/state';
import { useDevProfileInfoContext } from '@jobstash/profile/state';
import { useMwVersionContext } from '@jobstash/shared/state';

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

  const { mwVersion } = useMwVersionContext();
  const queryClient = useQueryClient();

  const unlink = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T extends any[]>(
      unlinkFn: (...args: T) => Promise<User>,
      ...args: T
    ) => {
      try {
        const result = await unlinkFn(...args);

        // Invalidate related queries
        await queryClient.invalidateQueries({
          queryKey: [mwVersion, 'dev-profile-info'],
        });
        await queryClient.invalidateQueries({
          queryKey: [mwVersion, 'affiliated-orgs'],
        });

        return result;
      } catch (error) {
        notifError({ message: (error as Error).message });
      }
    },
    [mwVersion, queryClient],
  );

  const connectedAccounts = useMemo(() => {
    if (!user) return [];

    const { email, farcaster, github, google, telegram } = user;

    const connectedAccounts = [
      github && {
        text: github.username,
        label: 'Github',
        avatar: profileInfoData?.githubAvatar,
        unlink: () => unlink(unlinkGithub, github.subject),
      },
      email && {
        text: email.address,
        label: 'Email',
        unlink: () => unlink(unlinkEmail, email.address),
      },
      telegram && {
        text: telegram.username,
        label: 'Telegram',
        unlink: () => unlink(unlinkTelegram, telegram.telegramUserId),
      },
      google && {
        text: google.email,
        label: 'Google',
        unlink: () => unlink(unlinkGoogle, google.email),
      },
      farcaster &&
        typeof farcaster.fid === 'number' && {
          text: farcaster.username,
          label: 'Farcaster',
          avatar: farcaster.pfp,
          unlink: () => unlink(unlinkFarcaster, farcaster.fid as number),
        },
      ...wallets.map((wallet) => ({
        text: wallet,
        label: 'Wallet',
        unlink: () => unlink(unlinkWallet, wallet),
      })),
    ].filter(Boolean);

    return connectedAccounts as ConnectedAccount[];
  }, [
    profileInfoData?.githubAvatar,
    unlink,
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
