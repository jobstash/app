'use client';

import { Button } from '@nextui-org/button';

import { FRONTEND_URL } from '~/shared/core/envs';

interface Props {
  orgId: string;
}

export const ShareButton = ({ orgId }: Props) => {
  const onClick = () => {
    if (typeof navigator !== 'undefined') {
      const path = `${FRONTEND_URL}/${orgId}/reviews`;
      navigator.clipboard.writeText(path);
    }
  };

  return (
    <Button className="bg-white/5 hover:bg-white/10" onClick={onClick}>
      Share with an Employee
    </Button>
  );
};
