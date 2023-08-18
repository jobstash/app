import { useSalaryFormContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const SalaryFormActions = () => {
  const { disableSave, save } = useSalaryFormContext();

  return (
    <div className="flex items-center justify-center pt-2 w-full gap-8">
      <Button
        variant="primary"
        className="px-8"
        isDisabled={disableSave}
        onClick={save}
      >
        Save & Next
      </Button>

      <Button
        variant="outline"
        className="px-8 bg-darker-gray"
        isDisabled={disableSave}
      >
        Delete
      </Button>
    </div>
  );
};

export default SalaryFormActions;
