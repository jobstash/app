import { Link } from '@nextui-org/react';

import { capitalize, getWebsiteText } from '@jobstash/shared/utils';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';
import { Text } from '@jobstash/shared/ui';

import { CellProps } from './types';

export const ShowcaseCell = ({ data }: CellProps) => {
  if (!data) return null;

  const {
    user: { showcases },
  } = data;

  const hasShowcase = showcases.length > 0;
  if (!hasShowcase) {
    return <EmptyCellPlaceholder />;
  }

  return (
    <div className="flex flex-col gap-1 h-fit self-start">
      {showcases.map(({ id, label, url }) => (
        <div key={id} className="flex gap-2">
          <Text fw="bold">{capitalize(label)}:</Text>
          <Link
            href={getWebsiteText(url).link}
            size="sm"
            underline="hover"
            className="text-sm text-white/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </Link>
        </div>
      ))}
      {showcases.map(({ id, label, url }) => (
        <div key={id} className="flex gap-2">
          <Text fw="bold">{capitalize(label)}:</Text>
          <Link
            href={getWebsiteText(url).link}
            size="sm"
            underline="hover"
            className="text-sm text-white/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </Link>
        </div>
      ))}
    </div>
  );
};
