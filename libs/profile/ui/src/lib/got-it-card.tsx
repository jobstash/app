import { memo, ReactNode } from 'react';

import { Button, Heading } from '@jobstash/shared/ui';

interface Props {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  children: ReactNode;
}

const GotItCard = (props: Props) => {
  const { icon, title, onClick, children } = props;

  return (
    <div className="flex-col border border-white/10 rounded-3xl py-6 pr-16 bg-dark">
      <div className="flex radius-xl gap-1">
        {icon}
        <div className="flex flex-col pt-6 space-y-4">
          <Heading fw="semibold" size="xl">
            {title}
          </Heading>
          {children}
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" className="px-10 py-2.5" onClick={onClick}>
          OK Got it!
        </Button>
      </div>
    </div>
  );
};

export default memo(GotItCard);
