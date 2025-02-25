import { memo } from 'react';

import { Button } from '@heroui/button';
import { Checkbox } from '@heroui/checkbox';

import Heading from '../base/heading';

interface Props {
  title: string;
  checkboxProps: {
    label: string;
    isSelected: boolean;
    onValueChange: (isSelected: boolean) => void;
  };
  onClickCopyLink: () => void;
}

const ShareMenuContent = (props: Props) => {
  const {
    title,
    checkboxProps: { label, isSelected, onValueChange },
    onClickCopyLink,
  } = props;
  return (
    <div className="flex flex-col gap-4 py-2 px-4">
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
      <Checkbox
        color="default"
        isSelected={isSelected}
        onValueChange={onValueChange}
      >
        {label}
      </Checkbox>
      <Button onClick={onClickCopyLink}>Copy Link</Button>
    </div>
  );
};

export default memo(ShareMenuContent);
