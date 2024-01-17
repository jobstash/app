import { memo, ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { Heading, Hexagon, Text } from '@jobstash/shared/ui';

interface Props {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  children: ReactNode;
}

const GotItCard = (props: Props) => {
  const { icon, title, onClick, children } = props;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex border border-white/10 rounded-3xl p-6 md:p-0 md:pr-8 bg-dark">
        <div className="hidden md:flex md:-ml-4 items-center justify-center">
          <Hexagon icon={icon} />
        </div>
        <div className="flex flex-col gap-4 md:gap-4 md:py-8">
          <Heading className="text-xl md:text-2xl">{title}</Heading>

          {children}

          {onClick && (
            <div className="flex w-full md:justify-end pt-2">
              <button
                type="button"
                className={cn(
                  'flex w-full items-center justify-center rounded-lg bg-gradient-to-l from-primary to-tertiary py-3 transition duration-150 gap-1 ease-in-out md:max-w-[120px] ',
                )}
                onClick={onClick}
              >
                <Text size="sm" fw="bold">
                  OK Got It!
                </Text>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(GotItCard);
