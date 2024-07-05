import { Link } from '@nextui-org/react';

import { getContactLink } from '@jobstash/profile/utils';
import { capitalize } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from '../empty-cell-placeholder';

interface Props {
  socials?: {
    github: string | null;
    email: string | null;
    discord: string | null;
    telegram: string | null;
    farcaster: string | null;
    lens: string | null;
    twitter: string | null;
  };
}

export const SocialsCell = ({ socials }: Props) => {
  if (!socials) return null;

  const hasSocials = Object.values(socials).some(Boolean);
  if (!hasSocials) {
    return <EmptyCellPlaceholder />;
  }

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 h-fit">
      {Object.entries(socials)
        .filter(([, value]) => value !== null)
        .map(([key, value]) => {
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
