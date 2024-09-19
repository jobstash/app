import { useMemo } from 'react';

import { usePrivy, User, Wallet } from '@privy-io/react-auth';

import { useDevProfileInfoContext } from '@jobstash/profile/state';

interface ConnectedAccount {
  text: string;
  label: string;
  unlink: () => Promise<User>;
  avatar?: string | null;
}

export const useConnectedAccounts = () => {
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

  return useMemo(() => {
    if (!user) return [];

    const { email, farcaster, github, google, telegram, linkedAccounts } = user;

    const wallets = linkedAccounts
      .filter(
        (account) =>
          account.type === 'wallet' && account.walletClientType !== 'privy',
      )
      .map((wallet) => (wallet as Wallet).address);

    const connectedAccounts = [
      github && {
        text: github.username,
        label: 'Github',
        avatar: profileInfoData?.avatar,
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
        text: formatAddress(wallet),
        label: 'Wallet',
        unlink: () => unlinkWallet(wallet),
      })),
    ].filter(Boolean);

    return connectedAccounts as ConnectedAccount[];
  }, [
    profileInfoData?.avatar,
    unlinkEmail,
    unlinkFarcaster,
    unlinkGithub,
    unlinkGoogle,
    unlinkTelegram,
    unlinkWallet,
    user,
  ]);
};

const formatAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;
