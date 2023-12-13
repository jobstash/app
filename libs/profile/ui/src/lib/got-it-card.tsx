import { memo, ReactNode } from 'react';

import { Button, Heading, Hexagon } from '@jobstash/shared/ui';

interface Props {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  children: ReactNode;
}

const GotItCard = (props: Props) => {
  const { icon, title, onClick, children } = props;

  return (
    <div className="flex border border-white/10 rounded-3xl pt-4 pr-12 bg-dark">
      <div className="flex radius-xl gap-1">
        <div>
          <Hexagon icon={icon} />
        </div>
        <div className="flex flex-col py-6 space-y-4">
          <Heading fw="semibold" size="xl">
            {title}
          </Heading>
          {children}

          {onClick && (
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="px-10 py-2.5"
                onClick={onClick}
              >
                OK Got it!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(GotItCard);
