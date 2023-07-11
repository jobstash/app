import { memo } from 'react';

import { Button } from '@jobstash/shared/ui';

interface Props {
  link: string;
  text: string;
  external?: boolean;
}

const RightPanelCta = ({ link, text, external }: Props) => {
  const onClick = () => {
    if (typeof window !== 'undefined') {
      if (external) {
        window.open(link, '_blank');
      } else {
        window.location.href = link;
      }
    }
  };

  return (
    <div className="flex w-full justify-between">
      <Button variant="primary" onClick={onClick}>
        {text}
      </Button>
      {/* <div className="flex items-start space-x-2 lg:hidden">
        <ShareButton jobTitle={jobTitle} />
      </div> */}
    </div>
  );
};

export default memo(RightPanelCta);
