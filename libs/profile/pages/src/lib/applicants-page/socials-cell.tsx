import { Link } from '@nextui-org/react';

import { getContactLink } from '@jobstash/profile/utils';
import { capitalize } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { CellProps } from './types';

export const SocialsCell = ({ data }: CellProps) => {
  if (!data) return <EmptyCellPlaceholder />;

  const {
    user: { username, contact },
  } = data;

  const hasSocials = Object.values(contact).some(Boolean);
  if (!hasSocials) {
    return <EmptyCellPlaceholder />;
  }

  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-1 h-fit">
      {Object.entries({ github: username, ...contact })
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
