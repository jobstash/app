import { useMemo } from 'react';

import { Link } from '@heroui/link';

import { LinkedAccounts } from '@jobstash/shared/core';
import { getContactLink } from '@jobstash/profile/utils';
import { capitalize } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from './empty-cell-placeholder';

interface Props {
  alternateEmails?: string[];
  linkedAccounts?: LinkedAccounts;
}

export const SocialsCell = ({
  alternateEmails = [],
  linkedAccounts,
}: Props) => {
  const accounts = useMemo(() => {
    const result: { key: string; value: string }[] = [];

    for (const email of alternateEmails) {
      if (email) {
        result.push({ key: `email`, value: email });
      }
    }

    if (linkedAccounts) {
      for (const [key, value] of Object.entries(linkedAccounts)) {
        if (value && typeof value === 'string') {
          result.push({ key, value });
        }
      }

      for (const wallet of linkedAccounts.wallets) {
        if (wallet) {
          result.push({ key: `wallet`, value: wallet });
        }
      }
    }

    return result;
  }, [alternateEmails, linkedAccounts]);

  const hasSocials = Object.values(accounts).some(Boolean);
  if (!hasSocials) {
    return <EmptyCellPlaceholder />;
  }

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 h-fit">
      {accounts.map(({ key, value }) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const href = getContactLink(key, value)!;
        return (
          <div key={key} className="flex gap-1">
            <Link
              href={href}
              size="sm"
              underline="hover"
              className="font-semibold text-sm text-white/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {capitalize(key)}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
