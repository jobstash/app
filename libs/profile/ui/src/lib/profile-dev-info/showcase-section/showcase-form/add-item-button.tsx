import { Tooltip } from '@mantine/core';

import { useProfileShowcaseFormContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const AddItemButton = () => {
  const { disabled, currentShowcase, onClickAddItem } =
    useProfileShowcaseFormContext();

  return (
    <Tooltip
      withArrow
      label={`Add "${currentShowcase.label}" to your works`}
      opened={!disabled.addItem}
      color="dark"
      classNames={{
        tooltip: 'bg-gray',
      }}
      position="right"
    >
      <Button isIcon isDisabled={disabled.addItem} onClick={onClickAddItem}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Button>
    </Tooltip>
  );
};

export default AddItemButton;
