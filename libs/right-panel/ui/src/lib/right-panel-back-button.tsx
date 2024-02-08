import { useRouter } from 'next/router';
import { memo } from 'react';

import { ArrowLeftIcon, Button } from '@jobstash/shared/ui';

interface Props {
  backURL?: string;
  onClick?: () => void;
}

const RightPanelBackButton = ({ backURL, onClick }: Props) => {
  const router = useRouter();

  // Defaults to router push
  const onClickBack = () => {
    if (backURL) {
      router.push(backURL, undefined, { shallow: true, scroll: false });
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant="outline"
      left={<ArrowLeftIcon />}
      size="md"
      onClick={onClickBack}
    >
      Back
    </Button>
  );
};

export default memo(RightPanelBackButton);
