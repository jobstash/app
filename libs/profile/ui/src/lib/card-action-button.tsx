import { memo } from 'react';

import { Button } from '@jobstash/shared/ui';

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const CardActionButton = ({ isDisabled, onClick }: Props) => (
  <div className="flex w-full justify-center">
    <Button
      variant="primary"
      className="px-8"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      Save
    </Button>
  </div>
);

export default memo(CardActionButton);
