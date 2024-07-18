import { memo } from 'react';

import { Button } from '@nextui-org/react';

interface Props {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const RightPanelCta = ({ text, onClick, isLoading, isDisabled }: Props) => (
  <div className="flex w-full justify-between">
    <Button
      isLoading={isLoading}
      isDisabled={isDisabled}
      className="bg-gradient-to-l from-primary to-tertiary"
      radius="sm"
      onClick={onClick}
    >
      {text}
    </Button>
    {/* <div className="flex items-start space-x-2 lg:hidden">
        <ShareButton title={title} />
      </div> */}
  </div>
);

export default memo(RightPanelCta);
