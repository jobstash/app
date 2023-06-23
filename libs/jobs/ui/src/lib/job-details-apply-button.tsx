import { memo } from 'react';

import { Button } from '@jobstash/shared/ui';

interface Props {
  applyUrl: string;
}

const JobDetailsApplyButton = ({ applyUrl }: Props) => {
  const onClick = () => {
    if (typeof window !== 'undefined') {
      window.open(applyUrl, '_blank');
    }
  };

  return (
    <div className="flex w-full justify-between">
      <Button variant="primary" onClick={onClick}>
        Apply for this job
      </Button>
      {/* <div className="flex items-start space-x-2 lg:hidden">
        <ShareButton jobTitle={jobTitle} />
      </div> */}
    </div>
  );
};

export default memo(JobDetailsApplyButton);
