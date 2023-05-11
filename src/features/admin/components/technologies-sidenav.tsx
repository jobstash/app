import { NextRouter } from 'next/router';
import { memo, useCallback } from 'react';

import { Button } from '~/shared/components';

interface Props {
  asPath: string;
  push: NextRouter['push'];
}

export const technologiesSideNavs = [
  { label: 'Synonyms', path: '/godmode/technologies/synonyms' },
  { label: 'Paired Terms', path: '/godmode/technologies/paired-terms' },
  { label: 'Blocked Terms', path: '/godmode/technologies/blocked-terms' },
  {
    label: 'Technology Approvals',
    path: '/godmode/technologies/approvals',
  },
];

const TechnologiesSidenav = ({ asPath, push }: Props) => {
  const redirectTo = useCallback((path: string) => push(path), [push]);

  return (
    <div className="flex gap-2">
      {technologiesSideNavs.map(({ label, path }) => (
        <Button
          key={label}
          variant="outline"
          isActive={asPath === path}
          onClick={() => redirectTo(path)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default memo(TechnologiesSidenav);
