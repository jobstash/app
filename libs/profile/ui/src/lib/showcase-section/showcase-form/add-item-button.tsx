import { useProfileShowcaseContext } from '@jobstash/profile/state';

import { Button, Spinner } from '@jobstash/shared/ui';

const AddItemButton = () => {
  const { editedShowcase, isLoading, addShowcase } =
    useProfileShowcaseContext();

  const isDisabled =
    !editedShowcase.label || !editedShowcase.url || isLoading.mutation;

  if (isLoading.mutation) return <Spinner />;

  return (
    <Button isIcon isDisabled={isDisabled} onClick={addShowcase}>
      <AddItemIcon />
    </Button>
  );
};

export default AddItemButton;

const AddItemIcon = () => (
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
);
