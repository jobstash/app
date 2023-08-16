import { memo } from 'react';

import { Button } from '@jobstash/shared/ui';

interface Props {
  text: string;
  onClick: () => void;
}

const RightPanelCta = ({ text, onClick }: Props) => (
  <div className="flex w-full justify-between">
    <Button variant="primary" onClick={onClick}>
      {text}
    </Button>
    {/* <div className="flex items-start space-x-2 lg:hidden">
        <ShareButton jobTitle={jobTitle} />
      </div> */}
  </div>
);

export default memo(RightPanelCta);
