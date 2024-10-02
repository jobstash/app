import { memo, ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

import { Heading, Hexagon, Text } from '@jobstash/shared/ui';

interface Props {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  children: ReactNode;
  heading?: ReactNode;
}

const GotItCard = (props: Props) => {
  const { icon, title, onClick, children, heading } = props;

  return (
    <div className="flex flex-col gap-12">
      <div className=" p-6 border @lg:flex border-white/10 rounded-3xl md:px-8 bg-dark">
        <div className="items-center justify-center hidden md:flex md:-ml-4">
          <Hexagon icon={icon} />
        </div>
        <div className="flex flex-col gap-4 md:gap-4 md:py-8">
          {heading || (
            <Heading className="text-xl md:text-2xl">{title}</Heading>
          )}

          {children}

          {onClick && (
            <div className="flex w-full pt-2 md:justify-end">
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
