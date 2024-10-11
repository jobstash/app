import { useCallback } from 'react';

import { useLinkAccount, usePrivy } from '@privy-io/react-auth';
import { useQueryClient } from '@tanstack/react-query';
import { Github as GithubIcon } from 'lucide-react';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';

import { EmailIcon, FarcasterIcon, GoogleIcon, WalletIcon } from './icons';

const SUCCESS_TITLE = 'Account Connected!';
const SUCCESS_MESSAGE =
  "You've successfully linked your account, enhancing your profile visibility.";

const ERR_EXITED_LINK_FLOW = 'exited_link_flow';
const ERR_CANNOT_LINK_MORE = 'cannot_link_more_of_type';
const ERR_TOAST_TITLE = 'Failed to link account!';
const ERR_ACCOUNT_ALREADY_ADDED = 'Account already added';
interface AvailableAccount {
  onClick: () => void;
  label: string;
  icon: JSX.Element;
}

export const useAvailableAccounts = () => {
  const { user } = usePrivy();

  const { mwVersion } = useMwVersionContext();
  const queryClient = useQueryClient();

  const onSuccess = useCallback(async () => {
    // Invalidate related queries
    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'dev-profile-info'],
    });
    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'affiliated-orgs'],
    });

    notifSuccess({
      title: SUCCESS_TITLE,
      message: SUCCESS_MESSAGE,
    });
  }, [mwVersion, queryClient]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = useCallback((error: any) => {
    if (error !== ERR_EXITED_LINK_FLOW) {
      notifError({
        title: ERR_TOAST_TITLE,
        message:
          error === ERR_CANNOT_LINK_MORE
            ? ERR_ACCOUNT_ALREADY_ADDED
            : ERR_INTERNAL,
      });
    }
  }, []);

  const { linkEmail, linkFarcaster, linkGithub, linkGoogle, linkWallet } =
    useLinkAccount({
      onSuccess,
      onError,
    });

  if (!user) return [];

  const { email, farcaster, github, google } = user;

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
    !farcaster && {
      onClick: linkFarcaster,
      label: 'Farcaster',
      icon: <FarcasterIcon />,
    },
    // Temporary disable Telegram
    // !telegram && {
    //   onClick: linkTelegram,
    //   label: 'Telegram',
    //   icon: <TelegramIcon />,
    // },
    {
      onClick: linkWallet,
      label: 'Wallet',
      icon: <WalletIcon />,
    },
  ].filter(Boolean);

  return availableAccounts as AvailableAccount[];
};
