import { memo } from 'react';

import { Button } from '@jobstash/shared/ui';

interface Props {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const RightPanelCta = ({ text, onClick, isDisabled }: Props) => (
  <div className="flex w-full justify-between">
    <Button variant="primary" isDisabled={isDisabled} onClick={onClick}>
      {text}
    </Button>
    {/* <div className="flex items-start space-x-2 lg:hidden">
        <ShareButton title={title} />
      </div> */}
  </div>
);

export default memo(RightPanelCta);
