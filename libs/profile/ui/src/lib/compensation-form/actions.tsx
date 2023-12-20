import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

const Actions = () => {
  const {
    isDisabledCompensationSave: isDisabledSalarySave,
    saveCompensation: saveSalary,
  } = useProfileOrgReviewFormContext();

  return (
    <div className="flex items-center justify-center pt-2 w-full gap-8">
      <Button
        variant="primary"
        className="px-8"
        isDisabled={isDisabledSalarySave}
        onClick={saveSalary}
      >
        Save
      </Button>

      <Button
        variant="outline"
        className="px-8 bg-darker-gray"
        isDisabled={isDisabledSalarySave}
      >
        Delete
      </Button>
    </div>
  );
};

export default Actions;
