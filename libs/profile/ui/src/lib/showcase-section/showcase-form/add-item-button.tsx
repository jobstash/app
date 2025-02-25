import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';

import { useProfileShowcaseContext } from '@jobstash/profile/state';

const AddItemButton = () => {
  const { editedShowcase, isLoading, addShowcase } =
    useProfileShowcaseContext();

  const isDisabled =
    !editedShowcase.label || !editedShowcase.url || isLoading.mutation;

  return (
    <Button isIconOnly isDisabled={isDisabled} onClick={addShowcase}>
      {isLoading.mutation ? (
        <Spinner size="sm" color="white" />
      ) : (
        <FloppyIcon />
      )}
    </Button>
  );
};

export default AddItemButton;

const FloppyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    className="w-7 h-7 fill-white"
  >
    <path
      fill="white"
      d="M208 32H83.31A15.86 15.86 0 0 0 72 36.69L36.69 72A15.86 15.86 0 0 0 32 83.31V208a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M88 48h80v32H88Zm120 160H48V83.31l24-24V80a16 16 0 0 0 16 16h80a16 16 0 0 0 16-16V48h24Zm-80-96a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24"
    />
  </svg>
);
