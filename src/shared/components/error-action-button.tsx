'use client';

import { Button } from '@nextui-org/button';

import { reloadPage } from '~/shared/utils/reload-page';

interface Props {
  text?: string;
  onClick?: () => void;
}

export const ErrorActionButton = ({
  text = DEFAULT_TEXT,
  onClick = DEFAULT_ONCLICK,
}: Props) => {
  return (
    <Button
      className="flex items-center rounded-lg bg-gradient-to-l from-[#8743FF] to-[#4136F1] p-2 px-4"
      onClick={onClick}
    >
      <span className="shrink-0 text-xs font-semibold sm:text-sm">{text}</span>
    </Button>
  );
};

const DEFAULT_TEXT = 'Reload Page';
const DEFAULT_ONCLICK = reloadPage;
