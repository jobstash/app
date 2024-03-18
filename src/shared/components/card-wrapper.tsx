'use client';

import { PrimitiveAtom, useAtom } from 'jotai';

import { cn } from '~/shared/utils/cn';

interface Props {
  id: string;
  idAtom: PrimitiveAtom<string | null>;
  children: React.ReactNode;
}

export const CardWrapper = ({ id, idAtom, children }: Props) => {
  const [activeId, setActiveId] = useAtom(idAtom);
  const isActive = activeId === id;

  const onClick = () => {
    setActiveId(id);
  };

  return (
    <div
      className={cn(
        'rounded-3xl bg-darkest-gray transition-all duration-300 hover:bg-darker-gray',
        {
          'bg-gradient-to-l from-primary to-secondary hover:brightness-125':
            isActive,
        },
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
