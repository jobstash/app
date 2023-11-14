import { usePreferredTermsFormContext } from '@jobstash/admin/state';

import { Button } from '@jobstash/shared/ui';

const PreferredTermsActions = () => {
  const { onSubmit, isDisabledSubmit } = usePreferredTermsFormContext();

  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          className="px-6"
          isDisabled={isDisabledSubmit}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PreferredTermsActions;
