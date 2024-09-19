import { useCallback } from 'react';

import { useLinkAccount, usePrivy } from '@privy-io/react-auth';
import { Github as GithubIcon } from 'lucide-react';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError } from '@jobstash/shared/utils';

import {
  EmailIcon,
  FarcasterIcon,
  GoogleIcon,
  TelegramIcon,
  WalletIcon,
} from './icons';

interface AvailableAccount {
  onClick: () => void;
  label: string;
  icon: JSX.Element;
}

export const useAvailableAccounts = (onSuccess: () => void) => {
  const { user } = usePrivy();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = useCallback((error: any) => {
    if (error !== 'exited_link_flow') {
      notifError({
        title: 'Failed to link account!',
        message:
          error === 'cannot_link_more_of_type'
            ? 'Account already added'
            : ERR_INTERNAL,
      });
    }
  }, []);

  const {
    linkEmail,
    linkFarcaster,
    linkGithub,
    linkGoogle,
    linkTelegram,
    linkWallet,
  } = useLinkAccount({
    onSuccess,
    onError,
  });

  if (!user) return [];

  const { email, farcaster, github, google, telegram } = user;

  const availableAccounts = [
    !email && {
      onClick: linkEmail,
      label: 'Email',
      icon: <EmailIcon />,
    },
    !github && {
      onClick: linkGithub,
      label: 'Github',
      icon: <GithubIcon size={16} />,
    },
    !google && {
      onClick: linkGoogle,
      label: 'Google',
      icon: <GoogleIcon />,
    },
    !telegram && {
      onClick: linkTelegram,
      label: 'Telegram',
      icon: <TelegramIcon />,
    },
    !farcaster && {
      onClick: linkFarcaster,
      label: 'Farcaster',
      icon: <FarcasterIcon />,
    },
    {
      onClick: linkWallet,
      label: 'Wallet',
      icon: <WalletIcon />,
    },
  ].filter(Boolean);

  return availableAccounts as AvailableAccount[];
};
