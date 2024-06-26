import { useProfileShowcaseContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const FormToggler = () => {
  const { isLoading, displayForm, onToggleForm } = useProfileShowcaseContext();

  if (displayForm) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      isDisabled={isLoading.query || isLoading.mutation}
      onClick={onToggleForm}
    >
      Add Documents
    </Button>
  );
};

export default FormToggler;
