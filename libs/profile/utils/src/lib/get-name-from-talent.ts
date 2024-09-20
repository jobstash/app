import { LinkedAccounts } from '@jobstash/profile/core';
import { formatWalletAddress } from '@jobstash/shared/utils';

interface Props {
  linkedAccounts: LinkedAccounts;
  name: string | null;
  alternateEmails: string[];
}

export const getNameFromTalent = ({
  name,
  linkedAccounts,
  alternateEmails,
}: Props) => {
  const {
    github,
    email,
    google,
    telegram,
    farcaster,
    wallets,
    discord,
    twitter,
    apple,
  } = linkedAccounts;

  const alternateEmail =
    alternateEmails.length > 0 ? alternateEmails[0] : undefined;

  const text = [
    name,
    github,
    alternateEmail,
    email,
    google,
    telegram,
    farcaster,
    discord,
    twitter,
    apple,
    ...wallets.map((wallet) => formatWalletAddress(wallet)),
  ].find(Boolean) as string;

  return text;
};
